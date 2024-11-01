class StartHandler {
    constructor(bot) {
        this.bot = bot;
    }

    register() {
        this.bot.start(ctx =>
            ctx.reply('Welcome! Use /help for available commands.')
        );
    }
}

module.exports = StartHandler;
