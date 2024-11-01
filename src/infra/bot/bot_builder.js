const StartHandler = require('./handlers/start_handler');
const HelpHandler = require('./handlers/help_handler');
const ReminderHandler = require('./handlers/reminder_handler');

class BotBuilder {
    constructor(bot, reminderService) {
        this.bot = bot;
        this.reminderService = reminderService;
    }

    build() {
        const handlers = [
            new StartHandler(this.bot),
            new HelpHandler(this.bot),
            new ReminderHandler(this.bot, this.reminderService),
        ];

        handlers.forEach(handler => handler.register());
    }
}

module.exports = BotBuilder;
