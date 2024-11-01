const moment = require('moment');
const ReminderCreationError = require('../../errors/reminder_creation_error');
const InvalidReminderTimeError = require('../../errors/invalid_time_reminder_time_error');

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
            return ctx.reply('Usage: /reminder YYYY-MM-DD HH:MM your message');
        }

        const [date, time, ...messageParts] = args;
        const dateTime = `${date} ${time}`;
        const message = messageParts.join(' ');
        const userId = ctx.message.from.id;

        if (!moment(dateTime, 'YYYY-MM-DD HH:mm', true).isValid()) {
            this.logger.warn(
                `Invalid time format for user ${userId}: ${dateTime}`
            );
            return ctx.reply(
                'Invalid time format. Please use YYYY-MM-DD HH:MM'
            );
        }

        try {
            const reminder = await this.reminderService.createReminder(
                dateTime,
                message,
                userId
            );
            ctx.reply(
                `Reminder created for ${reminder.getTime()}: ${reminder.getMessage()}`
            );
            this.logger.info(
                `Reminder created for user ${userId} at ${dateTime}`
            );
        } catch (error) {
            if (error instanceof ReminderCreationError) {
                this.logger.error(
                    `Failed to create reminder for user ${userId}: ${error.message}`
                );
                ctx.reply(`Error creating reminder: ${error.message}`);
            } else if (error instanceof InvalidReminderTimeError) {
                this.logger.warn(
                    `Invalid reminder time for user ${userId}: ${dateTime}`
                );
                ctx.reply('Invalid time format. Please use YYYY-MM-DD HH:MM');
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(
                    'An unexpected error occurred. Please try again later.'
                );
            }
        }
    }
}

module.exports = ReminderHandler;
