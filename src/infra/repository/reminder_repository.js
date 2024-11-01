const ReminderModel = require('../db/models/reminder');
const DatabaseError = require('../../infra/errors/database_error');
const { Op } = require('sequelize');
const moment = require('moment');

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

    async findByDateRange(userId, startDate, endDate) {
        try {
            return await ReminderModel.findAll({
                where: {
                    userId,
                    time: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });
        } catch (error) {
            throw new DatabaseError(
                `Failed to fetch reminders within the specified range: ${error.message}`
            );
        }
    }

    async searchOpenReminders(userId) {
        try {
            return await ReminderModel.findAll({
                where: {
                    userId,
                    time: {
                        [Op.gte]: moment().toISOString(),
                    },
                },
                order: [['time', 'ASC']],
            });
        } catch (error) {
            throw new DatabaseError(
                `Failed to fetch open reminders: ${error.message}`
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
