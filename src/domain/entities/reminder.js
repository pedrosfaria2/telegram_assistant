const moment = require('moment');
const InvalidReminderTimeError = require('../../infra/errors/invalid_time_reminder_time_error');

class Reminder {
    constructor({ time, message, userId }) {
        if (!this.validateTime(time)) {
            throw new InvalidReminderTimeError(
                'Invalid time format for Reminder'
            );
        }
        if (!message || typeof message !== 'string' || message.trim() === '') {
            throw new Error(
                'Message is required and must be a non-empty string'
            );
        }
        if (!userId || typeof userId !== 'number') {
            throw new Error('User ID is required and must be a number');
        }

        this._time = time;
        this._message = message;
        this._userId = userId;
    }

    validateTime(time) {
        return moment(time, 'YYYY-MM-DD HH:mm', true).isValid();
    }

    getTime() {
        return this._time;
    }

    getMessage() {
        return this._message;
    }

    getUserId() {
        return this._userId;
    }
}

module.exports = Reminder;
