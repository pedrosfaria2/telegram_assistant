class HelpHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.help(async ctx => {
            try {
                await ctx.reply(
                    'Available commands: /reminder YYYY-MM-DD HH:MM your message'
                );
                this.logger.info('Help command executed successfully');
            } catch (error) {
                this.logger.error(
                    `Error executing help command: ${error.message}`
                );
                await ctx.reply(
                    'An error occurred while processing the help command.'
                );
            }
        });
    }
}

module.exports = HelpHandler;
