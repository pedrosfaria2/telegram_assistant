const Reminder = require('../../domain/entities/reminder');
const ReminderCreationError = require('../../infra/errors/reminder_creation_error');
const ReminderNotFoundError = require('../../infra/errors/reminder_not_found_error');

class ReminderService {
    constructor(reminderRepository, logger) {
        this.reminderRepository = reminderRepository;
        this.logger = logger;
    }

    async createReminder(time, message, userId) {
        try {
            const reminder = new Reminder({ time, message, userId });
            await this.reminderRepository.save(reminder);
            this.logger.info(`Reminder created for user ${userId} at ${time}`);
            return reminder;
        } catch (error) {
            this.logger.error(
                `Failed to create reminder for user ${userId}: ${error.message}`
            );
            throw new ReminderCreationError(
                `Failed to create reminder: ${error.message}`
            );
        }
    }

    async removeReminder(reminder) {
        const deleted = await this.reminderRepository.remove(reminder);
        if (!deleted) {
            this.logger.warn(`Reminder not found for deletion: ${reminder.id}`);
            throw new ReminderNotFoundError(`Reminder not found for deletion`);
        }
        this.logger.info(`Reminder deleted: ${reminder.id}`);
    }

    async searchPendingReminders() {
        const reminders = await this.reminderRepository.searchAll();
        this.logger.info(`Fetched ${reminders.length} pending reminders`);
        return reminders;
    }
}

module.exports = ReminderService;
