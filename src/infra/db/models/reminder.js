const { DataTypes } = require('sequelize');
const sequelize = require('../../db/db');

const Reminder = sequelize.define(
    'Reminder',
    {
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'Reminders',
        timestamps: false,
    }
);

module.exports = Reminder;
