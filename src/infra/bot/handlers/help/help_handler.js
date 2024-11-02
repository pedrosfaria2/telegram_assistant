const { HelpMessages } = require('../../../enumerators/messages');
const getRemindersHelp = require('./help_reminder');

class HelpHandler {
    constructor(bot, logger) {
        this.bot = bot;
        this.logger = logger;
        this.helpTopics = {
            reminders: getRemindersHelp,
        };
    }

    register() {
        this.bot.command('help', this.handleHelp.bind(this));
    }

    async handleHelp(ctx) {
        try {
            const args = ctx.message.text.split(' ').slice(1);
            if (args.length === 0) {
                await this.sendGeneralHelp(ctx);
            } else {
                await this.sendSpecificHelp(ctx, args[0].toLowerCase());
            }
            this.logger.info('Help command executed successfully');
        } catch (error) {
            this.logger.error(`Error executing help command: ${error.message}`);
            await ctx.reply(HelpMessages.HELP_ERROR);
        }
    }

    async sendGeneralHelp(ctx) {
        const helpIntro = HelpMessages.HELP_INTRO;
        const availableTopics = Object.keys(this.helpTopics);
        const commandsList = availableTopics
            .map(
                topic =>
                    `- \`/help ${topic}\` - ${this.getTopicDescription(topic)}`
            )
            .join('\n');

        const helpMessage = HelpMessages.HELP_GENERAL_TEMPLATE.replace(
            '{commandsList}',
            commandsList
        );

        await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
    }

    getTopicDescription(topic) {
        const descriptions = {
            reminders: 'Help about reminders',
        };
        return descriptions[topic] || 'Help about this topic';
    }

    async sendSpecificHelp(ctx, topic) {
        const helpHandler = this.helpTopics[topic];
        if (helpHandler) {
            const message = await helpHandler();
            await ctx.reply(message, { parse_mode: 'Markdown' });
        } else {
            await ctx.reply(HelpMessages.HELP_UNKNOWN_TOPIC, {
                parse_mode: 'Markdown',
            });
        }
    }
}

module.exports = HelpHandler;
