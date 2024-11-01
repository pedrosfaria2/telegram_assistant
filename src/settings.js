require('dotenv').config();

function getEnvVariable(name, defaultValue = undefined) {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
        throw new Error(
            `Environment variable ${name} is required but not defined.`
        );
    }
    return value || defaultValue;
}

module.exports = {
    telegramToken: getEnvVariable('TELEGRAM_TOKEN'),
    port: getEnvVariable('PORT', 3000),
    databaseUrl: getEnvVariable('DATABASE_URL', './reminders.db'),
};
