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
    INVALID_ITEM_ID:
        'The item ID provided is not valid. Please use a numeric ID and try again.',
});

module.exports = ErrorMessages;
