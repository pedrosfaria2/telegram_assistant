class Reminder{
    constructor( { time, message, userId} ) {
        if (!this.validateTime(time)){
            throw new Error("Invalid time");
        }
        this.time = time;
        this.message = message;
        this.userId = userId;
    }

    validateTime(time){
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
    }

    getTime(){
        return this.time;
    }

    getMessage(){
        return this.message;
    }

    getUserId(){
        return this.userId;
    }
}

module.exports = Reminder;