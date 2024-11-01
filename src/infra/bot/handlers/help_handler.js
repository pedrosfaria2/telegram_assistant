class HelpHandler {
    constructor(bot) {
        this.bot = bot;
    }

    register() {
        this.bot.help(ctx =>
            ctx.reply(
                'Available commands: /reminder YYYY-MM-DD HH:MM your message'
            )
        );
    }
}

module.exports = HelpHandler;
