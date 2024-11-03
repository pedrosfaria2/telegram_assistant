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
    HELP_SHOPPING_LIST_ADD:
        '🛒 *To add an item to your shopping list:*\n' +
        '`/add_item [item name]`\n' +
        'For example: `/add_item Milk`\n\n',
    HELP_SHOPPING_LIST_REMOVE:
        '🗑️ *To remove an item from your shopping list:*\n' +
        '`/remove_item [item ID]`\n' +
        'For example: `/remove_item 3`\n\n',
    HELP_SHOPPING_LIST_LIST:
        '📋 *To view all items in your shopping list:*\n' +
        '`/list_items`\n' +
        'This will show all items you have added to your shopping list.\n\n',
    HELP_SHOPPING_LIST_MARK:
        '✅ *To mark an item as purchased:*\n' +
        '`/mark_purchased [item ID]`\n' +
        'For example: `/mark_purchased 5`\n\n',
    HELP_SHOPPING_LIST_UNMARK:
        '🔄 *To unmark an item as purchased:*\n' +
        '`/unmark_purchased [item ID]`\n' +
        'For example: `/unmark_purchased 5`\n\n',
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
