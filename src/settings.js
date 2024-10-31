require('dotenv').config();

module.exports = {
    telegramToken: process.env.TELEGRAM_TOKEN,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL || './reminders.db',
};
