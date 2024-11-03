const ErrorMessages = Object.freeze({
    REMINDER_USAGE:
        "Oops! It looks like you're missing some information. \n\n*Correct usage:* `/reminder YYYY-MM-DD HH:MM [your message]` \n\nFor example:\n`/reminder 2024-11-01 09:00 Coffee with client`",
    INVALID_TIME_FORMAT:
        "The time format doesn't look quite right! \n\n*Please use:* `YYYY-MM-DD HH:MM` \n\nFor example:\n`/reminder 2024-11-01 09:00 Coffee with client`",
    REMINDER_CREATION_ERROR:
        'There was an issue creating your reminder. 😕 Please double-check the information and try again.',
    INVALID_REMINDER_TIME:
        'Hmm, the time seems off. \n\nPlease format it as `YYYY-MM-DD HH:MM` \n\nExample:\n`/reminder 2024-11-01 09:00 Meeting with team`',
    ERROR_FETCHING_REMINDERS:
        "Oops! Something went wrong while retrieving today's reminders. Please try again later.",
    ERROR_FETCHING_OPEN_REMINDERS:
        'Oops! Something went wrong while retrieving your open reminders. Please try again later.',
    START_ERROR:
        'Oops! Something went wrong while processing the start command. Please try again later.',
    UNEXPECTED_ERROR:
        'An unexpected error occurred. 😬 Please try again later, and if the issue persists, let us know!',
    SHOPPING_LIST_ADD_USAGE:
        "Oops! It looks like you're missing the item name. \n\n*Correct usage:* `/add_item [item name]` \n\nFor example:\n`/add_item Milk`",
    SHOPPING_LIST_REMOVE_USAGE:
        "Oops! It looks like you're missing the item ID. \n\n*Correct usage:* `/remove_item [item ID]` \n\nFor example:\n`/remove_item 3`",
    SHOPPING_LIST_MARK_USAGE:
        "Oops! It looks like you're missing the item ID. \n\n*Correct usage:* `/mark_purchased [item ID]` \n\nFor example:\n`/mark_purchased 5`",
    SHOPPING_LIST_UNMARK_USAGE:
        "Oops! It looks like you're missing the item ID. \n\n*Correct usage:* `/unmark_purchased [item ID]` \n\nFor example:\n`/unmark_purchased 5`",
    SHOPPING_LIST_CREATION_ERROR:
        'There was an issue adding the item to your shopping list. Please try again later.',
    ITEM_NOT_FOUND:
        'The requested item could not be found in your shopping list. Please check the ID and try again.',
    SHOPPING_LIST_BULK_REMOVE_USAGE:
        "Hmm, I didn't catch which items to remove. You can either specify item IDs like this: `/bulk_remove <item_id1> <item_id2> ...`, or remove everything by typing `/bulk_remove all`.",
    INVALID_ITEM_ID:
        'Uh-oh! That item ID doesn’t look right. Please provide a valid number.',
    INVALID_ITEM_IDS:
        "Oops! Some of those IDs look off. Make sure they're numbers separated by spaces.",
    NO_ITEMS_FOUND:
        'Looks like there’s nothing to remove with those IDs. Double-check and try again!',
});

module.exports = ErrorMessages;
