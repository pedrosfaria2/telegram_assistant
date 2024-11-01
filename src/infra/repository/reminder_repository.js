const Reminder = require('../db/models/reminder');

class ReminderRepository {
    async save(reminder) {
        return await Reminder.create({
            time: reminder.time,
            message: reminder.message,
            userId: reminder.userId,
        });
    }

    async searchAll() {
        return await Reminder.findAll();
    }

    async remove(reminder) {
        await Reminder.destroy({ where: { id: reminder.id } });
    }
}

module.exports = ReminderRepository;
