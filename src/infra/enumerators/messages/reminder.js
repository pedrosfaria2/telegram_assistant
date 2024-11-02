const ReminderMessages = Object.freeze({
    REMINDER_CREATED:
        '✅ Great! Your reminder has been set for *{{date}}* with the message: "{{message}}"',
    REMINDER_ALERT:
        '⏰ *Reminder Alert!* \n\n📅 *Date & Time:* {{date}} \n📝 *Message:* "{{message}}"\n\nLet\'s make the most of this reminder! 💪',
    NO_REMINDERS_FOR_TODAY:
        "You have no reminders set for today. You're all clear! 😊",
    NO_REMINDERS_FOR_SPECIFIC_DAY:
        'You have no reminders set for that date. Enjoy the free time! 😊',
    REMINDER_LIST_HEADER: "Here's what's on your agenda for today:\n\n",
    REMINDER_LIST_SPECIFIC_DAY_HEADER:
        "Here's what's on your agenda for *{{date}}*:\n\n",
    REMINDER_TIME_FORMAT: (time, message) => `🕒 *${time}* - ${message}`,
});

module.exports = ReminderMessages;
