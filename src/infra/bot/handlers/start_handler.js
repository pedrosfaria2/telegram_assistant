class StartHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.start(async ctx => {
            try {
                await ctx.reply(
                    'Hi there! 👋 Welcome to your personal reminder bot. You can set reminders for specific dates and times.\n\n' +
                        '📜 *Quick Tip:* Use `/help` to see all available commands and learn how to use them!\n\n' +
                        'Let’s get started! 😊',
                    { parse_mode: 'Markdown' }
                );
                this.logger.info(
                    `Start command executed successfully for user: ${ctx.from.id}`
                );
            } catch (error) {
                this.logger.error(
                    `Error executing start command for user ${ctx.from.id}: ${error.message}`
                );
                await ctx.reply(
                    'Oops! Something went wrong while processing the start command. Please try again later.'
                );
            }
        });
    }
}

module.exports = StartHandler;
