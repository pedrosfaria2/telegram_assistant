const HelpMessages = Object.freeze({
    HELP_INTRO:
        'Hey there! 👋 Here are some handy commands to get you started:\n\n',
    HELP_REMINDER:
        '📅 *To create a reminder:*\n' +
        '`/reminder YYYY-MM-DD HH:MM [your message]`\n' +
        'Example: `/reminder 2024-11-01 09:00 Coffee with client`\n\n',
    HELP_WHATS_FOR_THE_DAY:
        '📅 *To see today’s reminders:*\n' +
        '`/whats_for_day`\n' +
        'Or specify a date: `/whats_for_day YYYY-MM-DD`\n\n',
    HELP_OPEN_REMINDERS:
        '📅 *To view all your upcoming reminders:*\n' +
        '`/open_reminders`\n' +
        'Shows a list of all reminders organized by date.\n\n',
    HELP_SHOPPING_LIST_ADD:
        '🛒 *To add an item to your shopping list:*\n' +
        '`/add_item [item name]`\n' +
        'Example: `/add_item Milk`\n\n',
    HELP_SHOPPING_LIST_REMOVE:
        '🗑️ *To remove an item from your shopping list:*\n' +
        '`/remove_item [item ID]`\n' +
        'Example: `/remove_item 3`\n\n',
    HELP_SHOPPING_LIST_LIST:
        '📋 *To view all items in your shopping list:*\n' +
        '`/list_items`\n' +
        'Shows all items currently in your shopping list.\n\n',
    HELP_SHOPPING_LIST_MARK:
        '✅ *To mark an item as purchased:*\n' +
        '`/mark_purchased [item ID]`\n' +
        'Example: `/mark_purchased 5`\n\n',
    HELP_SHOPPING_LIST_UNMARK:
        '🔄 *To unmark an item as purchased:* \n' +
        '`/unmark_purchased [item ID]`\n' +
        'Example: `/unmark_purchased 5`\n\n',
    HELP_OTHER:
        'Need more help? Just ask away! 😊\n\n' +
        '⚙️ *More useful commands are on the way!*',
    WHATS_FOR_SPECIFIC_DAY_USAGE:
        'To view reminders for a specific day, please use:\n' +
        '`/whats_for_day YYYY-MM-DD`\n' +
        'Example: `/whats_for_day 2024-11-01`',
    HELP_ERROR:
        'Oops! Something went wrong while processing the help command. Please try again in a moment!',
    HELP_GENERAL_TEMPLATE:
        'Hello! 👋 Here’s a list of commands you can use:\n\n*Available Commands:*\n{commandsList}\n\nUse `/help <command>` to get specific help.\n\nIf you need more assistance, feel free to ask! 😊\n\n⚙️ *More useful commands coming soon!*',
    HELP_UNKNOWN_TOPIC:
        "❓ *Oops! I don't have information about that topic.*\n\n" +
        '🔍 *Check available commands with `/help` or let me know if you need assistance!* 😊',
    HELP_SHOPPING_LIST_BULK_REMOVE:
        '🚮 *Bulk Remove Items:* Use `/bulk_remove <item_id1> <item_id2> ...` to remove multiple items by ID, or `/bulk_remove all` to clear your entire list.\n\n',
});

module.exports = HelpMessages;
