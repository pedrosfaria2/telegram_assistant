const { Telegraf } = require('telegraf');
const settings = require('./settings');
const ReminderRepository = require('./infra/reminder_repository');
const ReminderService = require('./app/reminder_service');
const SchedulerService = require('./app/scheduler_service');
const sequelize = require('./infra/db');
const moment = require('moment');

const bot = new Telegraf(settings.telegramToken);
const reminderRepository = new ReminderRepository();
const reminderService = new ReminderService(reminderRepository);
const schedulerService = new SchedulerService(reminderService, bot);

sequelize.sync().then(() => {
    console.log('Database synchronized');

    bot.start(ctx => ctx.reply('Welcome! Use /help for available commands.'));
    bot.help(ctx =>
        ctx.reply('Available commands: /reminder YYYY-MM-DD HH:MM your message')
    );

    bot.command('reminder', async ctx => {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 3) {
            return ctx.reply('Usage: /reminder YYYY-MM-DD HH:MM your message');
        }

        const [date, time, ...messageParts] = args;
        const dateTime = `${date} ${time}`;
        const message = messageParts.join(' ');
        const userId = ctx.message.from.id;

        try {
            if (!moment(dateTime, 'YYYY-MM-DD HH:mm', true).isValid()) {
                return ctx.reply(
                    'Invalid time format. Please use YYYY-MM-DD HH:MM'
                );
            }

            const reminder = await reminderService.createReminder(
                dateTime,
                message,
                userId
            );
            ctx.reply(
                `Reminder created for ${reminder.getTime()}: ${reminder.getMessage()}`
            );
        } catch (error) {
            ctx.reply(`Error creating reminder: ${error.message}`);
        }
    });

    schedulerService.start();

    bot.launch()
        .then(() => {
            console.log('Bot successfully launched');
        })
        .catch(err => {
            console.error('Error launching the bot:', err);
        });

    console.log('Bot started');
});
