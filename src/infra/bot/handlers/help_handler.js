class HelpHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.help(async ctx => {
            try {
                await ctx.reply(
                    'Hello! 👋 Here are some commands you can use:\n\n' +
                        '📅 *To create a reminder:*\n' +
                        '`/reminder YYYY-MM-DD HH:MM [your message]`\n' +
                        'For example: `/reminder 2024-11-01 09:00 Coffee meeting with client`\n\n' +
                        '⚙️ *More useful commands coming soon!*\n\n' +
                        "If you need help, I'm here! 😊",
                    { parse_mode: 'Markdown' }
                );
                this.logger.info('Help command executed successfully');
            } catch (error) {
                this.logger.error(
                    `Error executing help command: ${error.message}`
                );
                await ctx.reply(
                    'Oops! Something went wrong while processing the help command. Please try again in a moment!'
                );
            }
        });
    }
}

module.exports = HelpHandler;
