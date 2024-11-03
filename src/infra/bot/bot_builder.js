const StartHandler = require('./handlers/start_handler');
const HelpHandler = require('./handlers/help/help_handler');
const ReminderHandler = require('./handlers/reminder/reminder_handler');
const WhatsForTheDayHandler = require('./handlers/reminder/whats_for_the_day_handler');
const ShoppingListHandler = require('./handlers/shopping_list/shopping_list_handler');
const OpenRemindersHandler = require('./handlers/reminder/open_reminds_handler');
const MessageInterpreter = require('../router/message_interpreter');

class BotBuilder {
    constructor(bot, reminderService, shoppingListService, logger) {
        this.bot = bot;
        this.reminderService = reminderService;
        this.shoppingListService = shoppingListService;
        this.logger = logger;

        this.messageInterpreter = new MessageInterpreter(
            bot,
            shoppingListService,
            reminderService,
            logger
        );
    }

    build() {
        this.logger.info('Starting to build bot handlers');

        const handlerConfigs = [
            {
                handlerClass: StartHandler,
                params: [this.bot, this.logger],
            },
            {
                handlerClass: HelpHandler,
                params: [this.bot, this.logger],
            },
            {
                handlerClass: ReminderHandler,
                params: [this.bot, this.reminderService, this.logger],
            },
            {
                handlerClass: WhatsForTheDayHandler,
                params: [this.bot, this.reminderService, this.logger],
            },
            {
                handlerClass: ShoppingListHandler,
                params: [this.bot, this.shoppingListService, this.logger],
            },
            {
                handlerClass: OpenRemindersHandler,
                params: [this.bot, this.reminderService, this.logger],
            },
        ];

        handlerConfigs.forEach(config => {
            const handler = new config.handlerClass(...config.params);
            handler.register();
        });

        this.bot.on('message', async ctx => {
            try {
                if (ctx.message.text.startsWith('/')) {
                    return;
                }
                await this.messageInterpreter.interpret(ctx);
            } catch (error) {
                this.logger.error(
                    `Error handling user message: ${error.message}`
                );
                await ctx.reply(
                    'An error occurred while processing your request. Please try again later.'
                );
            }
        });

        this.logger.info('Bot handlers built successfully');
    }
}

module.exports = BotBuilder;
