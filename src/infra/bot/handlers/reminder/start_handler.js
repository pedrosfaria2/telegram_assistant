const { GeneralMessages, ErrorMessages } = require('../../../enumerators/messages');

class StartHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.start(async ctx => {
            try {
                await ctx.reply(GeneralMessages.START_WELCOME, {
                    parse_mode: 'Markdown',
                });
                this.logger.info(
                    `Start command executed successfully for user: ${ctx.from.id}`
                );
            } catch (error) {
                this.logger.error(
                    `Error executing start command for user ${ctx.from.id}: ${error.message}`
                );
                await ctx.reply(ErrorMessages.START_ERROR);
            }
        });
    }
}

module.exports = StartHandler;
