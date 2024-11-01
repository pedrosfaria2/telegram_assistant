const ReminderModel = require('../db/models/reminder');
const DatabaseError = require('../../infra/errors/database_error');

class ReminderRepository {
    async save(reminder) {
        try {
            return await ReminderModel.create({
                time: reminder.getTime(),
                message: reminder.getMessage(),
                userId: reminder.getUserId(),
            });
        } catch (error) {
            throw new DatabaseError(
                `Failed to save reminder: ${error.message}`
            );
        }
    }

    async searchAll() {
        try {
            return await ReminderModel.findAll();
        } catch (error) {
            throw new DatabaseError(
                `Failed to fetch reminders: ${error.message}`
            );
        }
    }

    async remove(reminder) {
        let deletedCount;

        try {
            deletedCount = await ReminderModel.destroy({
                where: { id: reminder.id },
            });
        } catch (error) {
            throw new DatabaseError(
                `Failed to remove reminder: ${error.message}`
            );
        }

        if (deletedCount === 0) {
            throw new DatabaseError(
                `Reminder with ID ${reminder.id} not found for deletion`
            );
        }

        return true;
    }
}

module.exports = ReminderRepository;
