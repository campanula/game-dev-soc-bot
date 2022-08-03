const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const { Collection, Intents, Client } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES]
});

client.commands = new Collection();
client.menus = new Collection();

const handlerFiles = fs.readdirSync(__dirname+'/handlers').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(__dirname+'/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');
const menuFiles = fs.readdirSync(__dirname+'/menus').filter(file => file.endsWith('.js'));

(async () => {
    for (file of handlerFiles){
        require(__dirname+`/handlers/${file}`)(client);
    }
        client.eventHandler(eventFiles, __dirname+'/events');
        client.commandHandler(commandFolders, __dirname+'/commands');
        client.menuHandler(menuFiles, __dirname+'/menus');
        client.login(process.env.TOKEN);
        client.dbHandler();
})();
