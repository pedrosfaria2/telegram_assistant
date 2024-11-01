const MessageEnum = require('../../enumerators/messages_enum');

class HelpHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
    }

    register() {
        this.bot.help(async ctx => {
            try {
                const helpMessage =
                    MessageEnum.HELP_INTRO +
                    MessageEnum.HELP_REMINDER +
                    MessageEnum.HELP_WHATS_FOR_THE_DAY +
                    MessageEnum.HELP_OPEN_REMINDERS +
                    MessageEnum.HELP_OTHER;

                await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
                this.logger.info('Help command executed successfully');
            } catch (error) {
                this.logger.error(
                    `Error executing help command: ${error.message}`
                );
                await ctx.reply(MessageEnum.HELP_ERROR);
            }
        });
    }
}

module.exports = HelpHandler;
