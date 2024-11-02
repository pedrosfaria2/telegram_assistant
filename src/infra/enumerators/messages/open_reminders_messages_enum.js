const OpenRemindersMessagesEnum = Object.freeze({
    NO_OPEN_REMINDERS:
        'You have no open reminders at the moment. Enjoy your free time! 😊',
    REMINDER_LIST_HEADER: '📅 *Your Upcoming Reminders*\n\n',
    MONTH_HEADER: month => `🌙 *${month}*\n\n`,
    DAY_HEADER: day => `  📅 *${day}*\n`,
    REMINDER_TIME_FORMAT: (time, message) =>
        `    ┗━━ ⏰ *${time}* - ${message}\n`,
    ERROR_FETCHING_OPEN_REMINDERS:
        'Oops! Something went wrong while retrieving your open reminders. Please try again later.',
});

module.exports = OpenRemindersMessagesEnum;
