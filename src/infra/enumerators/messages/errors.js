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
});

module.exports = ErrorMessages;
