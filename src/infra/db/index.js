const { Sequelize } = require('sequelize');
const settings = require('../../settings');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: settings.databaseUrl,
});

module.exports = sequelize;
