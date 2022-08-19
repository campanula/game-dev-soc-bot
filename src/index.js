const fs = require("fs");
const dotenv = require("dotenv");
const { Collection, Client } = require("discord.js");

dotenv.config();

const { logger, errorLogger } = require("./logger.js");

// Create a new client instance
const client = new Client({
    intents: 131071
});

client.log = logger;
client.error = errorLogger;

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
