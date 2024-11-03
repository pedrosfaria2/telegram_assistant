const { Sequelize } = require('sequelize');
const settings = require('../../settings');
const Logger = require('../../seedwork/logger');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: settings.databaseUrl,
    logging: msg => Logger.info(msg),
});

module.exports = sequelize;
