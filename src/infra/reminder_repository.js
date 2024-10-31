class ReminderRepository{
    constructor(){
        this.reminders = [];
    }

    async save(reminder){
        this.reminders.push(reminder);
    }

    async searchAll(){
        return this.reminders;
    }

    async remove(reminder){
        this.reminders = this.reminders.filter(r => r !== reminder);
    }
}

module.exports = ReminderRepository;