const {DataTypes } = require('sequelize');
const sequelize = require('../index');

const Reminder = sequelize.define('Reminder', {
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'reminders',
    timestamps: false,
});

module.exports = Reminder;