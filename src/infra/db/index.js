const sequelize = require('./db');
const Logger = require('../../seedwork/logger');

require('./models/reminder');
require('./models/shopping_list');

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

module.exports = {
    sequelize,
    initializeDatabase,
};
