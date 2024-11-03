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
    databaseUrl: getEnvVariable('DATABASE_URL', './telegram_bot.db'),

    openaiApiKey: getEnvVariable('OPENAI_API_KEY'),
    openaiApiUrl: getEnvVariable(
        'OPENAI_API_URL',
        'https://api.openai.com/v1/chat/completions'
    ),

    openaiModel: getEnvVariable('OPENAI_MODEL', 'gpt-3.5-turbo'),
    openaiMaxTokens: parseInt(getEnvVariable('OPENAI_MAX_TOKENS', '100'), 10),
    openaiTemperature: parseFloat(getEnvVariable('OPENAI_TEMPERATURE', '0.5')),
};
