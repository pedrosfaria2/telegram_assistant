const MessageEnum = Object.freeze({
    REMINDER_USAGE:
        "Oops! It looks like you're missing some information. \n\n*Correct usage:* `/reminder YYYY-MM-DD HH:MM [your message]` \n\nFor example:\n`/reminder 2024-11-01 09:00 Coffee with client`",
    INVALID_TIME_FORMAT:
        "The time format doesn't look quite right! \n\n*Please use:* `YYYY-MM-DD HH:MM` \n\nFor example:\n`/reminder 2024-11-01 09:00 Coffee with client`",
    REMINDER_CREATED:
        '✅ Great! Your reminder has been set for *{{date}}* with the message: "{{message}"',
    REMINDER_CREATION_ERROR:
        'There was an issue creating your reminder. 😕 Please double-check the information and try again.',
    INVALID_REMINDER_TIME:
        'Hmm, the time seems off. \n\nPlease format it as `YYYY-MM-DD HH:MM` \n\nExample:\n`/reminder 2024-11-01 09:00 Meeting with team`',
    UNEXPECTED_ERROR:
        'An unexpected error occurred. 😬 Please try again later, and if the issue persists, let us know!',
    START_WELCOME:
        'Hi there! 👋 Welcome to your personal reminder bot. You can set reminders for specific dates and times.\n\n' +
        '📜 *Quick Tip:* Use `/help` to see all available commands and learn how to use them!\n\n' +
        'Let’s get started! 😊',
    START_ERROR:
        'Oops! Something went wrong while processing the start command. Please try again later.',
    HELP_INTRO: 'Hello! 👋 Here are some commands you can use:\n\n',
    HELP_REMINDER:
        '📅 *To create a reminder:*\n' +
        '`/reminder YYYY-MM-DD HH:MM [your message]`\n' +
        'For example: `/reminder 2024-11-01 09:00 Coffee meeting with client`\n\n',
    HELP_WHATS_FOR_THE_DAY:
        '📅 *To view reminders for today:*\n`/whats_for_day`\n' +
        'Or specify a date: `/whats_for_day YYYY-MM-DD`\n\n',
    HELP_OTHER:
        'If you need more assistance, feel free to ask! 😊\n\n' +
        '⚙️ *More useful commands coming soon!*',
    HELP_ERROR:
        'Oops! Something went wrong while processing the help command. Please try again in a moment!',
    REMINDER_ALERT:
        '⏰ *Reminder Alert!* \n\n📅 *Date & Time:* {{date}} \n📝 *Message:* "{{message}}"\n\nLet\'s make the most of this reminder! 💪',
    NO_REMINDERS_FOR_TODAY:
        "You have no reminders set for today. You're all clear! 😊",
    REMINDER_LIST_HEADER: "Here's what's on your agenda for today:\n\n",
    ERROR_FETCHING_REMINDERS:
        "Oops! Something went wrong while retrieving today's reminders. Please try again later.",
    REMINDER_TIME_FORMAT: (time, message) => `🕒 *${time}* - ${message}`,
    WHATS_FOR_SPECIFIC_DAY_USAGE:
        'To check reminders for a specific day, please use:\n`/whats_for_day YYYY-MM-DD`\n\n' +
        'For example:\n`/whats_for_day 2024-11-01`',
    NO_REMINDERS_FOR_SPECIFIC_DAY:
        'You have no reminders set for that date. Enjoy the free time! 😊',
    REMINDER_LIST_SPECIFIC_DAY_HEADER:
        "Here's what's on your agenda for *{{date}}*:\n\n",
});

module.exports = MessageEnum;
