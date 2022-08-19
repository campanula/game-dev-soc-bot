const fs = require("fs");
const dotenv = require("dotenv");
const winston = require("winston");
const { Collection, Client } = require("discord.js");

dotenv.config();

const { addColors, createLogger, transports, format } = winston;
const { combine, colorize, padLevels, timestamp, printf, json, label } = format;

const levels = {
    botinfo: 0,
    interinfo: 1,
    debug: 2,
    error: 3,
}

addColors({
    botinfo: "blue",
    interinfo: "magenta",
    debug: "bold green",
    error: "bold rainbow",
})

const logger = createLogger({
    levels,
    level: "debug",
    transports: [new transports.Console({
        colorize: process.stdout.isTTY, // Only colourise in terminals
        timestamp: true,
        format: combine(
            padLevels({ levels }),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            label({ label: '[LOGGER]' }),
            printf(info => `${info.label} ${info.timestamp} ${info.level}:${info.message}`),
            colorize({ all: true }))
    }),
    new transports.File({
        filename: `${__dirname}/txt/logs.log`,
        level: levels.error,
        timestamp: true,
        format: combine(
            json(),
            timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
            printf(info => `${info.timestamp} ${info.level}:${info.message}`))
    })],
})

// Create a new client instance
const client = new Client({
    intents: 131071
});

client.log = logger;
client.commands = new Collection();
client.menus = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

const handlerFiles = fs.readdirSync(`${__dirname}/functions/handlers`).filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
    require(`${__dirname}/functions/handlers/${file}`)(client);
}

client.eventHandler();
client.commandHandler();
client.menuHandler();
client.buttonHandler();
client.modalHandler();
client.login(process.env.TOKEN);
