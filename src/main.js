const { Telegraf } = require('telegraf');
const settings = require('./settings');

const ReminderService = require('./app/services/reminder_service');
const SchedulerService = require('./app/services/scheduler_service');
const { initializeDatabase } = require('./infra/db/index');
const ReminderRepository = require('./infra/repository/reminder_repository');
const BotBuilder = require('./infra/bot/bot_builder');
const Logger = require('./seedwork/logger');

(async () => {
    try {
        await initializeDatabase();

        const bot = new Telegraf(settings.telegramToken);
        const reminderRepository = new ReminderRepository();
        const reminderService = new ReminderService(reminderRepository, Logger);
        const schedulerService = new SchedulerService(
            reminderService,
            bot,
            Logger
        );

        const botBuilder = new BotBuilder(bot, reminderService, Logger);
        botBuilder.build();

        schedulerService.start();

        await bot.launch();
        Logger.info('Bot successfully launched');
    } catch (error) {
        Logger.error(`Failed to initialize application: ${error.message}`, { stack: error.stack });
        process.exit(1);
    }
})();
