const { Sequelize } = require('sequelize');
const settings = require('../../settings');
const Logger = require('../../seedwork/logger');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: settings.databaseUrl,
    logging: msg => console.info(msg),
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        Logger.info('Database connection has been established successfully.');

        await sequelize.sync();
        Logger.info('Database synchronized successfully.');
    } catch (error) {
        Logger.error(`Unable to connect to the database: ${error.message}`);
        throw error;
    }
}

module.exports = { sequelize, initializeDatabase };
