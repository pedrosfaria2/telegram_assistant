const ErrorMessages = Object.freeze({
    REMINDER_USAGE:
        "🚨 Oops! It seems you're missing some details.\n\n*Correct format:* `/reminder YYYY-MM-DD HH:MM [your message]`\n\n*Example:* `/reminder 2024-11-01 09:00 Coffee with client`",
    INVALID_TIME_FORMAT:
        "⏰ That time format doesn't seem right!\n\n*Please use:* `YYYY-MM-DD HH:MM`\n\n*Example:* `/reminder 2024-11-01 09:00 Coffee with client`",
    REMINDER_CREATION_ERROR:
        '😕 Uh-oh, something went wrong while setting up your reminder. Please double-check and try again!',
    INVALID_REMINDER_TIME:
        "🚫 That time doesn't look valid.\n\n*Format required:* `YYYY-MM-DD HH:MM`\n\n*Example:* `/reminder 2024-11-01 09:00 Team meeting`",
    ERROR_FETCHING_REMINDERS:
        "⚠️ Oops! There was a hiccup retrieving today's reminders. Please try again later!",
    ERROR_FETCHING_OPEN_REMINDERS:
        "⚠️ Oh no! We couldn't get your open reminders right now. Give it another shot later.",
    START_ERROR:
        '⚙️ Oops! Something went wrong with the start command. Try again in a moment!',
    UNEXPECTED_ERROR:
        '😬 Yikes! An unexpected error happened. Please try again later, and let us know if it keeps happening!',
    SHOPPING_LIST_ADD_USAGE:
        '🚨 Oops! You forgot to include the item name.\n\n*Correct format:* `/add_item [item name]`\n\n*Example:* `/add_item Milk`',
    SHOPPING_LIST_REMOVE_USAGE:
        '🚨 Hmm, it looks like the item ID is missing.\n\n*Correct format:* `/remove_item [item ID]`\n\n*Example:* `/remove_item 3`',
    SHOPPING_LIST_MARK_USAGE:
        '🚨 Missing item ID!\n\n*Correct format:* `/mark_purchased [item ID]`\n\n*Example:* `/mark_purchased 5`',
    SHOPPING_LIST_UNMARK_USAGE:
        '🚨 You forgot the item ID!\n\n*Correct format:* `/unmark_purchased [item ID]`\n\n*Example:* `/unmark_purchased 5`',
    SHOPPING_LIST_CREATION_ERROR:
        "😕 Uh-oh! We couldn't add the item to your shopping list. Try again later.",
    ITEM_NOT_FOUND:
        "❓ Can't find that item in your list. Double-check the ID and try again!",
    SHOPPING_LIST_BULK_REMOVE_USAGE:
        "🤔 I didn't catch which items to remove.\n\n*Specify item IDs like:* `/bulk_remove <item_id1> <item_id2> ...`\n\nOr remove everything with `/bulk_remove all`.",
    INVALID_ITEM_ID:
        '🚫 Hmm, that item ID doesn’t look right. Please enter a valid number.',
    INVALID_ITEM_IDS:
        "🚫 Some of those IDs don't look correct. Make sure they're numbers separated by spaces.",
    NO_ITEMS_FOUND:
        "🧐 Couldn't find any items with those IDs. Double-check and try again!",
});

module.exports = ErrorMessages;
