const moment = require('moment');
const OpenRemindersMessagesEnum = require('../../../enumerators/messages/open_reminders_messages_enum');
const { GeneralMessages } = require('../../../enumerators/messages');

class OpenRemindersHandler {
    constructor(bot, reminderService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.logger = logger;
    }

    register() {
        this.bot.command('open_reminders', this.handleOpenReminders.bind(this));
    }

    async handleOpenReminders(ctx) {
        const userId = ctx.message.from.id;

        try {
            const reminders =
                await this.reminderService.getAllOpenReminders(userId);

            if (reminders.length === 0) {
                await ctx.reply(GeneralMessages.NO_OPEN_REMINDERS, {
                    parse_mode: 'Markdown',
                });
                this.logger.info(
                    `No open reminders to display for user ${userId}`
                );
                return;
            }

            const groupedReminders = reminders.reduce((acc, reminder) => {
                const month = moment(reminder.time).format('MMMM YYYY');
                const day = moment(reminder.time).format('dddd, Do');
                if (!acc[month]) acc[month] = {};
                if (!acc[month][day]) acc[month][day] = [];
                acc[month][day].push(reminder);
                return acc;
            }, {});

            let calendarView = OpenRemindersMessagesEnum.REMINDER_LIST_HEADER;

            Object.keys(groupedReminders).forEach(month => {
                calendarView += OpenRemindersMessagesEnum.MONTH_HEADER(month);
                Object.keys(groupedReminders[month]).forEach(day => {
                    calendarView += OpenRemindersMessagesEnum.DAY_HEADER(day);
                    groupedReminders[month][day].forEach(reminder => {
                        calendarView +=
                            OpenRemindersMessagesEnum.REMINDER_TIME_FORMAT(
                                moment(reminder.time).format('HH:mm'),
                                reminder.message
                            );
                    });
                    calendarView += '\n';
                });
            });

            await ctx.reply(calendarView, { parse_mode: 'Markdown' });
            this.logger.info(`Displayed all open reminders for user ${userId}`);
        } catch (error) {
            this.logger.error(
                `Error displaying open reminders for user ${userId}: ${error.message}`
            );
            await ctx.reply(
                OpenRemindersMessagesEnum.ERROR_FETCHING_OPEN_REMINDERS
            );
        }
    }
}

module.exports = OpenRemindersHandler;
