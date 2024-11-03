const StartHandler = require('./handlers/start_handler');
const HelpHandler = require('./handlers/help/help_handler');
const ReminderHandler = require('./handlers/reminder/reminder_handler');
const WhatsForTheDayHandler = require('./handlers/reminder/whats_for_the_day_handler');
const OpenRemindersHandler = require('./handlers/reminder/open_reminds_handler');
const ShoppingListHandler = require('./handlers/shopping_list/shopping_list_handler');

class BotBuilder {
    constructor(bot, reminderService, shoppingListService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    build() {
        this.logger.info('Starting to build bot handlers');

        const handlers = [
            new StartHandler(this.bot, this.logger),
            new HelpHandler(this.bot, this.logger),
            new ReminderHandler(this.bot, this.reminderService, this.logger),
            new WhatsForTheDayHandler(
                this.bot,
                this.reminderService,
                this.logger
            ),
            new OpenRemindersHandler(
                this.bot,
                this.reminderService,
                this.logger
            ),
            new ShoppingListHandler(
                this.bot,
                this.shoppingListService,
                this.logger
            ),
        ];

        handlers.forEach(handler => {
            try {
                handler.register();
                this.logger.info(
                    `${handler.constructor.name} registered successfully`
                );
            } catch (error) {
                this.logger.error(
                    `Error registering ${handler.constructor.name}: ${error.message}`
                );
            }
        });

        this.logger.info('Bot handlers built successfully');
    }
}

module.exports = BotBuilder;
