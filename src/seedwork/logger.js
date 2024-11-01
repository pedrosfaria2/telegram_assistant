const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, align } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] [${level}] - ${message}${stack ? `\n${stack}` : ''}`;
});

const Logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        align(),
        customFormat
    ),
    transports: [
        new transports.Console()
    ]
});

module.exports = Logger;
