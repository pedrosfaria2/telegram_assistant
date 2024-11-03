const moment = require('moment');
const chrono = require('chrono-node');
const {
    HelpMessages,
    ReminderMessages,
    ErrorMessages,
} = require('../../../enumerators/messages');

class WhatsForTheDayHandler {
    constructor(bot, reminderService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.logger = logger;
    }

    register() {
        this.bot.command('whats_for_day', this.handleWhatsForTheDay.bind(this));
    }

    async handleWhatsForTheDay(ctx) {
        const args = ctx.message.text.split(' ').slice(1);
        const userId = ctx.message.from.id;
        let date;

        if (args.length === 0) {
            date = moment();
        } else {
            const dateString = args.join(' ');
            const parsedDate = chrono.parseDate(dateString);
            if (parsedDate) {
                date = moment(parsedDate);
            } else {
                await ctx.reply(HelpMessages.WHATS_FOR_SPECIFIC_DAY_USAGE, {
                    parse_mode: 'Markdown',
                });
                this.logger.warn(
                    `Invalid date format provided by user ${userId}: ${dateString}`
                );
                return;
            }
        }

        const startOfDay = date.clone().startOf('day').toISOString();
        const endOfDay = date.clone().endOf('day').toISOString();

        try {
            const reminders = await this.reminderService.getIntervalReminders(
                userId,
                startOfDay,
                endOfDay
            );

            if (reminders.length === 0) {
                await ctx.reply(
                    ReminderMessages.NO_REMINDERS_FOR_SPECIFIC_DAY,
                    {
                        parse_mode: 'Markdown',
                    }
                );
                this.logger.info(
                    `No reminders to display for user ${userId} on date: ${date.format('YYYY-MM-DD')}`
                );
            } else {
                const reminderList = reminders
                    .map(reminder =>
                        ReminderMessages.REMINDER_TIME_FORMAT(
                            moment(reminder.time).format('HH:mm'),
                            reminder.message
                        )
                    )
                    .join('\n');

                const header =
                    ReminderMessages.REMINDER_LIST_SPECIFIC_DAY_HEADER.replace(
                        '{{date}}',
                        date.format('dddd, MMMM Do YYYY')
                    );
                await ctx.reply(`${header}${reminderList}`, {
                    parse_mode: 'Markdown',
                });
                this.logger.info(
                    `Displayed reminders for user ${userId} on date: ${date.format('YYYY-MM-DD')}`
                );
            }
        } catch (error) {
            this.logger.error(
                `Error displaying reminders for user ${userId} on date ${date.format('YYYY-MM-DD')}: ${error.message}`
            );
            await ctx.reply(ErrorMessages.ERROR_FETCHING_REMINDERS);
        }
    }
}

module.exports = WhatsForTheDayHandler;
