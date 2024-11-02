const HelpMessages = Object.freeze({
    HELP_INTRO: 'Hello! 👋 Here are some commands you can use:\n\n',
    HELP_REMINDER:
        '📅 *To create a reminder:*\n' +
        '`/reminder YYYY-MM-DD HH:MM [your message]`\n' +
        'For example: `/reminder 2024-11-01 09:00 Coffee meeting with client`\n\n',
    HELP_WHATS_FOR_THE_DAY:
        '📅 *To view reminders for today:*\n`/whats_for_day`\n' +
        'Or specify a date: `/whats_for_day YYYY-MM-DD`\n\n',
    HELP_OPEN_REMINDERS:
        '📅 *To view all open reminders:*\n' +
        '`/open_reminders`\n' +
        'This will show a list of all your upcoming reminders, organized by date.\n\n',
    HELP_OTHER:
        'If you need more assistance, feel free to ask! 😊\n\n' +
        '⚙️ *More useful commands coming soon!*',
    WHATS_FOR_SPECIFIC_DAY_USAGE:
        'To check reminders for a specific day, please use:\n`/whats_for_day YYYY-MM-DD`\n\n' +
        'For example:\n`/whats_for_day 2024-11-01`',
    HELP_ERROR:
        'Oops! Something went wrong while processing the help command. Please try again in a moment!',
    HELP_GENERAL_TEMPLATE:
        'Hello! 👋 Here are some commands you can use:\n\n*Available Commands:*\n{commandsList}\n\nUse `/help <command>` to get specific help.\n\nIf you need more assistance, feel free to ask! 😊\n\n⚙️ *More useful commands coming soon!*',
    HELP_UNKNOWN_TOPIC:
        "❓ *Sorry, I don't have help information about that topic.*\n\n" +
        '🔍 *Please check the available commands with `/help` or ask for assistance!* 😊',
});

module.exports = HelpMessages;
