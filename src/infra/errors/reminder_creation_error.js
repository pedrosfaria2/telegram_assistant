class ReminderCreationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ReminderCreationError';
    }
}

module.exports = ReminderCreationError;
