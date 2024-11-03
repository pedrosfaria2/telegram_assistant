const moment = require('moment');
const chrono = require('chrono-node');
const ReminderCreationError = require('../../../errors/reminder_creation_error');
const InvalidReminderTimeError = require('../../../errors/invalid_time_reminder_time_error');
const {
    ErrorMessages,
    ReminderMessages,
} = require('../../../enumerators/messages');

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
        const userId = ctx.message.from.id;

        if (args.length < 2) {
            return ctx.reply(ErrorMessages.REMINDER_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const inputText = args.join(' ');

        const parsedResults = chrono.parse(inputText);

        if (parsedResults.length === 0) {
            this.logger.warn(
                `Invalid time format for user ${userId}: ${inputText}`
            );
            return ctx.reply(ErrorMessages.INVALID_TIME_FORMAT, {
                parse_mode: 'Markdown',
            });
        }

        const parsedDate = parsedResults[0].start.date();
        const dateTime = moment(parsedDate).format('YYYY-MM-DD HH:mm');

        const dateTimeText = parsedResults[0].text;
        const message = inputText.replace(dateTimeText, '').trim();

        if (!message) {
            return ctx.reply(ErrorMessages.REMINDER_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        try {
            const reminder = await this.reminderService.createReminder(
                dateTime,
                message,
                userId
            );
            const formattedMessage = ReminderMessages.REMINDER_CREATED.replace(
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
                ctx.reply(ErrorMessages.REMINDER_CREATION_ERROR);
            } else if (error instanceof InvalidReminderTimeError) {
                this.logger.warn(
                    `Invalid reminder time for user ${userId}: ${dateTime}`
                );
                ctx.reply(ErrorMessages.INVALID_REMINDER_TIME, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }
}

module.exports = ReminderHandler;
