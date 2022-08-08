const fs = require("fs");
const dotenv = require("dotenv");
const winston = require("winston");
const { Collection, Client } = require("discord.js");

dotenv.config();

const levels = {
    botinfo: 0,
    interinfo: 1,
    debug: 2,
    error: 3,
}

winston.addColors({
    botinfo: "magenta",
    interinfo: "magenta",
    debug: "green",
    error: "rainbow",
})

const logger = winston.createLogger({
    levels: levels,
    transports: [new winston.transports.Console({ colorize: true, timestamp: true })],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.padLevels({ levels: levels }),
        winston.format.timestamp(({ format: "YYYY-MM-DD HH:mm:ss" })),
        winston.format.prettyPrint(),
        winston.format.printf(info => `${info.timestamp} ${info.level}:${info.message}`),
    ),
    level: "debug",
})

// Create a new client instance
const client = new Client({
    intents: 131071
});

client.log = logger;
client.commands = new Collection();
client.menus = new Collection();
client.buttons = new Collection();

const handlerFiles = fs.readdirSync(`${__dirname}/handlers`).filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
    require(`${__dirname}/handlers/${file}`)(client);
}

client.eventHandler();
client.commandHandler();
client.menuHandler();
client.buttonHandler();
client.login(process.env.TOKEN);
