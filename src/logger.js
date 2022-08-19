const winston = require("winston");
const { addColors, createLogger, transports, format } = winston;
const { combine, colorize, padLevels, timestamp, printf, json, label } = format;

const levels = {
    error: 0,
    botinfo: 1,
    interinfo: 2,
    process: 3,
    debug: 4,
};

addColors({
    error: "bold rainbow",
    botinfo: "blue",
    interinfo: "magenta",
    process: "white",
    debug: "bold green",
});

const logger = createLogger({
    levels,
    level: "debug",
    transports: [new transports.Console({
        colorize: process.stdout.isTTY, // Only colourise in terminals
        timestamp: true,
        format: combine(
            padLevels({ levels }),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            printf(info => `${info.timestamp} ${info.level}:${info.message}`),
            colorize({ all: true }))
    })],
});

// Creating seperate loggers for error and process-specific logs as level.process logs everything as its child
const errorLogger = createLogger({
    levels,
    level: "debug",
    transports: [new transports.Console({
        colorize: process.stdout.isTTY, // Only colourise in terminals
        timestamp: true,
        format: combine(
            padLevels({ levels }),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            label({ label: '[ERROR]' }),
            printf(info => `${info.label} ${info.timestamp} ${info.level}:${info.message}`),
            colorize({ all: true }))
    }),
    new transports.File({
        filename: `${__dirname}/txt/logs/error_logs.log`,
        timestamp: true,
        format: combine(
            json(),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            printf(info => `${info.timestamp} ${info.level}:${info.message}`))
    })],
});

const processLogger = createLogger({
    levels,
    level: "debug",
    transports: [new transports.Console({
        colorize: process.stdout.isTTY, // Only colourise in terminals
        timestamp: true,
        format: combine(
            padLevels({ levels }),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            label({ label: '[PROCESS]' }),
            printf(info => `${info.label} ${info.timestamp} ${info.level}:${info.message}`),
            colorize({ all: true }))
    }),
    new transports.File({
        filename: `${__dirname}/txt/logs/process_logs.log`,
        timestamp: true,
        format: combine(
            json(),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            printf(info => `${info.timestamp} ${info.level}:${info.message}`))
    })],
});

module.exports = { logger, errorLogger, processLogger };
