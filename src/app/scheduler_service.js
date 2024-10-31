const cron = require('node-cron');
const moment = require('moment-timezone');

class SchedulerService {
    constructor(reminderService, bot) {
        this.reminderService = reminderService;
        this.bot = bot;
        console.log("Scheduler service created");
    }

    start() {
        cron.schedule('* * * * *', async () => {
            console.log("Cron job triggered");
            await this.checkAndSendReminders();
        });
        console.log("Scheduler started");
    }

    async checkAndSendReminders() {
        console.log("Checking and sending reminders");
        const now = moment().tz("America/Sao_Paulo");
        const currentTime = now.format("HH:mm");

        const reminders = await this.reminderService.searchPendingReminders();
        for (const reminder of reminders) {
            if (reminder.time === currentTime) {
                await this.bot.telegram.sendMessage(reminder.userId, `Reminder: ${reminder.message}`);
                await this.reminderService.removeReminder(reminder);
            }
        }
    }
}

module.exports = SchedulerService;
