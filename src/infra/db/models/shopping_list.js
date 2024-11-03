const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db/db');

class ShoppingList extends Model {}

ShoppingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchased: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'ShoppingList',
    }
);

module.exports = ShoppingList;
