const cron = require('node-cron');
const moment = require('moment-timezone');
const { ReminderMessages } = require('../../infra/enumerators/messages');

class SchedulerService {
    constructor(reminderService, bot, logger) {
        this.reminderService = reminderService;
        this.bot = bot;
        this.logger = logger;
        this.logger.info('Scheduler service created');
    }

    start() {
        cron.schedule('* * * * *', async () => {
            this.logger.info('Cron job triggered');
            await this.checkAndSendReminders();
        });
        this.logger.info('Scheduler started');
    }

    async checkAndSendReminders() {
        this.logger.info('Checking and sending reminders');

        try {
            const currentTime = moment()
                .tz('America/Sao_Paulo')
                .format('YYYY-MM-DD HH:mm');
            const reminders =
                await this.reminderService.searchPendingReminders();

            for (const reminder of reminders) {
                try {
                    const reminderTime = moment(reminder.time).format(
                        'YYYY-MM-DD HH:mm'
                    );

                    if (reminderTime === currentTime) {
                        this.logger.info(
                            `Sending reminder to user ${reminder.userId}: ${reminder.message}`
                        );
                        await this.bot.telegram.sendMessage(
                            reminder.userId,
                            ReminderMessages.REMINDER_ALERT.replace(
                                '{{date}}',
                                moment(reminder.time).format(
                                    'dddd, MMMM Do YYYY, HH:mm'
                                )
                            ).replace('{{message}}', reminder.message),
                            { parse_mode: 'Markdown' }
                        );
                        await this.reminderService.removeReminder(reminder);
                        this.logger.info(
                            `Reminder sent and removed for user ${reminder.userId}`
                        );
                    }
                } catch (sendError) {
                    this.logger.error(
                        `Failed to send/remove reminder for user ${reminder.userId}: ${sendError.message}`
                    );
                }
            }
        } catch (error) {
            this.logger.error(`Error checking reminders: ${error.message}`);
        }
    }
}

module.exports = SchedulerService;
