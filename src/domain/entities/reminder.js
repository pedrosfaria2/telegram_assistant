const moment = require('moment');
const InvalidReminderTimeError = require('../../infra/errors/invalid_time_reminder_time_error');

class Reminder {
    constructor({ time, message, userId }) {
        if (!this.validateTimeFormat(time)) {
            throw new InvalidReminderTimeError(
                'Invalid time format for Reminder'
            );
        }
        if (!this.validateTimeIsFuture(time)) {
            throw new InvalidReminderTimeError(
                'Reminder time must be in the future'
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

    validateTimeFormat(time) {
        return moment(time, 'YYYY-MM-DD HH:mm', true).isValid();
    }

    validateTimeIsFuture(time) {
        const now = moment();
        const reminderTime = moment(time, 'YYYY-MM-DD HH:mm');
        return reminderTime.isAfter(now);
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
