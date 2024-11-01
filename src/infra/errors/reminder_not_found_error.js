class ReminderNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ReminderNotFoundError';
    }
}

module.exports = ReminderNotFoundError;
