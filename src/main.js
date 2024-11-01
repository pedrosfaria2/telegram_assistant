const { Telegraf } = require('telegraf');
const settings = require('./settings');

const ReminderService = require('./app/services/reminder_service');
const SchedulerService = require('./app/services/scheduler_service');
const { initializeDatabase } = require('./infra/db/index');
const ReminderRepository = require('./infra/repository/reminder_repository');
const BotBuilder = require('./infra/bot/bot_builder');

(async () => {
    try {
        await initializeDatabase();

        const logger = console;

        const bot = new Telegraf(settings.telegramToken);
        const reminderRepository = new ReminderRepository();
        const reminderService = new ReminderService(reminderRepository, logger);
        const schedulerService = new SchedulerService(
            reminderService,
            bot,
            logger
        );

        const botBuilder = new BotBuilder(bot, reminderService, logger);
        botBuilder.build();

        schedulerService.start();

        await bot.launch();
        console.log('Bot successfully launched');
    } catch (error) {
        console.error('Failed to initialize application:', error.message);
        process.exit(1);
    }
})();
