const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { Collection, Intents, Client } = require("discord.js");

// Create a new client instance
const client = new Client({
    intents: 131071
});

client.commands = new Collection();
client.menus = new Collection();
client.buttons = new Collection();

const handlerFiles = fs.readdirSync(__dirname + "/handlers").filter((file) => file.endsWith(".js"));

(async () => {
    for (file of handlerFiles) {
        require(__dirname + `/handlers/${file}`)(client);
    }
    client.eventHandler();
    client.commandHandler();
    client.menuHandler(); 
    client.buttonHandler();
    client.login(process.env.TOKEN);
})();
