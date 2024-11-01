const moment = require('moment');
const Messages = require('../../enumerators/messages_enum');

class WhatsForTheDayHandler {
    constructor(bot, reminderService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.logger = logger;
    }

    register() {
        this.bot.command(
            'whats_for_the_day',
            this.handleWhatsForTheDay.bind(this)
        );
    }

    async handleWhatsForTheDay(ctx) {
        const userId = ctx.message.from.id;
        const startOfDay = moment().startOf('day').toISOString();
        const endOfDay = moment().endOf('day').toISOString();

        try {
            const reminders = await this.reminderService.getIntervalReminders(
                userId,
                startOfDay,
                endOfDay
            );

            if (reminders.length === 0) {
                await ctx.reply(Messages.NO_REMINDERS_FOR_TODAY);
                this.logger.info(`No reminders to display for user ${userId}`);
            } else {
                const reminderList = reminders
                    .map(reminder =>
                        Messages.REMINDER_TIME_FORMAT(
                            moment(reminder.time).format('HH:mm'),
                            reminder.message
                        )
                    )
                    .join('\n');

                await ctx.reply(
                    `${Messages.REMINDER_LIST_HEADER}${reminderList}`,
                    { parse_mode: 'Markdown' }
                );
                this.logger.info(
                    `Displayed today's reminders for user ${userId}`
                );
            }
        } catch (error) {
            this.logger.error(
                `Error displaying today's reminders for user ${userId}: ${error.message}`
            );
            await ctx.reply(Messages.ERROR_FETCHING_REMINDERS);
        }
    }
}

module.exports = WhatsForTheDayHandler;
