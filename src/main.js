const { Telegraf } = require('telegraf');
const settings = require('./settings');

const ReminderService = require('./app/services/reminder_service');
const SchedulerService = require('./app/services/scheduler_service');
const sequelize = require('./infra/db');

const ReminderRepository = require('./infra/repository/reminder_repository');
const BotBuilder = require('./infra/bot/bot_builder');

(async () => {
    const bot = new Telegraf(settings.telegramToken);

    const reminderRepository = new ReminderRepository();
    const reminderService = new ReminderService(reminderRepository);
    const schedulerService = new SchedulerService(reminderService, bot);

    const botBuilder = new BotBuilder(bot, reminderService);
    botBuilder.build();

    await sequelize.sync();
    console.log('Database synchronized');

    schedulerService.start();

    bot.launch()
        .then(() => {
            console.log('Bot successfully launched');
        })
        .catch(err => {
            console.error('Error launching the bot:', err);
        });

    console.log('Bot started');
})();
