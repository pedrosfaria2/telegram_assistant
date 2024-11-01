const moment = require('moment');
const ReminderCreationError = require('../../errors/reminder_creation_error');
const InvalidReminderTimeError = require('../../errors/invalid_time_reminder_time_error');
const MessageEnum = require('../../enumerators/messages_enum');

class ReminderHandler {
    constructor(bot, reminderService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.logger = logger;
    }

    register() {
        this.bot.command('reminder', this.handleReminder.bind(this));
    }

    async handleReminder(ctx) {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 3) {
            return ctx.reply(MessageEnum.REMINDER_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const [date, time, ...messageParts] = args;
        const dateTime = `${date} ${time}`;
        const message = messageParts.join(' ');
        const userId = ctx.message.from.id;

        if (!moment(dateTime, 'YYYY-MM-DD HH:mm', true).isValid()) {
            this.logger.warn(
                `Invalid time format for user ${userId}: ${dateTime}`
            );
            return ctx.reply(MessageEnum.INVALID_TIME_FORMAT, {
                parse_mode: 'Markdown',
            });
        }

        try {
            const reminder = await this.reminderService.createReminder(
                dateTime,
                message,
                userId
            );
            const formattedMessage = MessageEnum.REMINDER_CREATED.replace(
                '{{date}}',
                moment(reminder.getTime()).format('dddd, MMMM Do YYYY, HH:mm')
            ).replace('{{message}}', reminder.getMessage());
            ctx.reply(formattedMessage, { parse_mode: 'Markdown' });
            this.logger.info(
                `Reminder created for user ${userId} at ${dateTime}`
            );
        } catch (error) {
            if (error instanceof ReminderCreationError) {
                this.logger.error(
                    `Failed to create reminder for user ${userId}: ${error.message}`
                );
                ctx.reply(MessageEnum.REMINDER_CREATION_ERROR);
            } else if (error instanceof InvalidReminderTimeError) {
                this.logger.warn(
                    `Invalid reminder time for user ${userId}: ${dateTime}`
                );
                ctx.reply(MessageEnum.INVALID_REMINDER_TIME, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(MessageEnum.UNEXPECTED_ERROR);
            }
        }
    }
}

module.exports = ReminderHandler;
