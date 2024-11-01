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

    async getIntervalReminders(userId, startDate, endDate) {
        try {
            const reminders = await this.reminderRepository.findByDateRange(
                userId,
                startDate,
                endDate
            );

            if (reminders.length === 0) {
                this.logger.info(
                    `No reminders found for user ${userId} within the interval.`
                );
                return [];
            }

            this.logger.info(
                `Found ${reminders.length} reminders for user ${userId} within the interval.`
            );
            return reminders;
        } catch (error) {
            this.logger.error(
                `Failed to fetch reminders for user ${userId} within the interval: ${error.message}`
            );
            throw new Error(
                `Unable to retrieve reminders within the interval.`
            );
        }
    }
}

module.exports = ReminderService;
