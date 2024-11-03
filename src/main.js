const { Telegraf } = require('telegraf');
const settings = require('./settings');

const ReminderService = require('./app/services/reminder/reminder_service');
const SchedulerService = require('./app/services/reminder/scheduler_service');
const { initializeDatabase } = require('./infra/db/index');
const ReminderRepository = require('./infra/repository/reminder_repository');
const BotBuilder = require('./infra/bot/bot_builder');
const Logger = require('./seedwork/logger');
const ShoppingListService = require('./app/services/shopping_list/shopping_list_service');
const ShoppingListRepository = require('./infra/repository/shopping_list_repository');

(async () => {
    try {
        await initializeDatabase();

        const bot = new Telegraf(settings.telegramToken);
        const reminderRepository = new ReminderRepository();
        const shoppingListRepository = new ShoppingListRepository();
        const reminderService = new ReminderService(reminderRepository, Logger);
        const shoppingListService = new ShoppingListService(
            shoppingListRepository,
            Logger
        );
        const schedulerService = new SchedulerService(
            reminderService,
            bot,
            Logger
        );

        const botBuilder = new BotBuilder(
            bot,
            reminderService,
            shoppingListService,
            Logger
        );
        botBuilder.build();

        schedulerService.start();

        await bot.launch();
        Logger.info('Bot successfully launched');
    } catch (error) {
        Logger.error(`Failed to initialize application: ${error.message}`, {
            stack: error.stack,
        });
        process.exit(1);
    }
})();
