const moment = require('moment');

class Reminder {
    constructor({ time, message, userId }) {
        if (!this.validateTime(time)) {
            throw new Error('Invalid time');
        }
        this.time = time;
        this.message = message;
        this.userId = userId;
    }

    validateTime(time) {
        return moment(time, 'YYYY-MM-DD HH:mm', true).isValid();
    }

    getTime() {
        return this.time;
    }

    getMessage() {
        return this.message;
    }

    getUserId() {
        return this.userId;
    }
}

module.exports = Reminder;
