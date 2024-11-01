class InvalidReminderTimeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidReminderTimeError';
    }
}

module.exports = InvalidReminderTimeError;
