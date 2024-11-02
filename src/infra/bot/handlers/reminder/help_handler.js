const { HelpMessages } = require('../../../enumerators/messages');

class HelpHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.help(async ctx => {
            try {
                const helpMessage =
                    HelpMessages.HELP_INTRO +
                    HelpMessages.HELP_REMINDER +
                    HelpMessages.HELP_WHATS_FOR_THE_DAY +
                    HelpMessages.HELP_OPEN_REMINDERS +
                    HelpMessages.HELP_OTHER;

                await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
                this.logger.info('Help command executed successfully');
            } catch (error) {
                this.logger.error(
                    `Error executing help command: ${error.message}`
                );
                await ctx.reply(HelpMessages.HELP_ERROR);
            }
        });
    }
}

module.exports = HelpHandler;
