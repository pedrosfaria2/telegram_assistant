const { Telegraf } = require('telegraf');
const settings = require('./settings');
const ReminderRepository = require("./infra/reminder_repository");
const ReminderService = require("./app/reminder_service");

const bot = new Telegraf(settings.telegramToken);

const reminderRepository = new ReminderRepository();
const reminderService = new ReminderService(reminderRepository);

bot.start((ctx) => ctx.reply("Welcome! Use /reminder to create a reminder."));
bot.help((ctx) => ctx.reply("Available commands: /reminder HH:MM your message"));

bot.command('reminder', async (ctx) => {
    const [time, ...messageParts] = ctx.message.text.split(' ').slice(1);
    const message = messageParts.join(' ');
    const userId = ctx.message.from.id;

    try{
        const reminder = await reminderService.createReminder(time, message, userId);
        ctx.reply(`Reminder created for ${reminder.getTime()}: ${reminder.getMessage()}`);
    } catch(error){
        ctx.reply(`Error creating reminder: ${error}`);
    }
});

bot.launch()
    .then(r => {
        console.log("Bot successfully launched:", r);
    })
    .catch(err => {
        console.error("Error launching the bot:", err);
    });

console.log("Bot started");
