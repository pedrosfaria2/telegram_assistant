const moment = require('moment');

class ReminderHandler {
    constructor(bot, reminderService) {
        this.bot = bot;
        this.reminderService = reminderService;
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
        } catch (error) {
            ctx.reply(`Error creating reminder: ${error.message}`);
        }
    }
}

module.exports = ReminderHandler;
