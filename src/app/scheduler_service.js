const cron = require('node-cron');

class SchedulerService{
    constructor(reminderService, bot){
        this.reminderService = reminderService;
        this.bot = bot;
    }

    start(){
        cron.schedule('* * * * *', async () => {
            await this.checkAndSendReminders();
        });
        console.log("Scheduler started");
    }

    async checkAndSendReminders(){
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;

        const reminders = await this.reminderService.searchPendingReminders();
        reminders.forEach(reminder => {
           if (reminder.getTime() === currentTime){
               this.bot.telegram.sendMessage(reminder.getUserId(), `Reminder: ${reminder.getMessage()}`);
               this.reminderService.removeReminder(reminder);
           }
        });
    }
}

module.exports = SchedulerService;