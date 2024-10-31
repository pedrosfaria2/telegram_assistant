const Reminder = require('../domain/reminder');

class ReminderService {
    constructor(reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    async createReminder(time, message, userId) {
        try {
            const reminder = new Reminder({ time, message, userId });
            await this.reminderRepository.save(reminder);
            return reminder;
        } catch (error) {
            throw new Error(`Error creating reminder: ${error.message}`);
        }
    }

    async removeReminder(reminder) {
        await this.reminderRepository.remove(reminder);
    }

    async searchPendingReminders() {
        return await this.reminderRepository.searchAll();
    }
}

module.exports = ReminderService;
