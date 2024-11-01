class StartHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.start(async ctx => {
            try {
                await ctx.reply('Welcome! Use /help for available commands.');
                this.logger.info(
                    'Start command executed successfully for user:',
                    ctx.from.id
                );
            } catch (error) {
                this.logger.error(
                    `Error executing start command for user ${ctx.from.id}: ${error.message}`
                );
                await ctx.reply(
                    'An error occurred while processing the start command.'
                );
            }
        });
    }
}

module.exports = StartHandler;
