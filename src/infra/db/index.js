const { Sequelize } = require('sequelize');
const settings = require('../../settings');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: settings.databaseUrl,
    logging: msg => console.info(msg),
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.info('Database connection has been established successfully.');

        await sequelize.sync();
        console.info('Database synchronized successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database: ${error.message}`);
        throw error;
    }
}

module.exports = { sequelize, initializeDatabase };
