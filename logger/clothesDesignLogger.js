// import winston from 'winston';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} ${message}`;
});

export default function clothesDesignLogger() {
    return createLogger({
        level: 'debug',
        format: combine(
            // format.colorize(),
            // timestamp(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        // defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console({ level: 'debug' }),
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
}