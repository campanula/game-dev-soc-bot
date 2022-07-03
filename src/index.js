const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const { Collection, Intents, Client } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'));
const handlerFiles = fs.readdirSync(__dirname+'/handlers').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(__dirname+'/events').filter(file => file.endsWith('.js'));

(async () => {
    for (file of handlerFiles){
        require(__dirname+`/handlers/${file}`)(client);
    }
        client.eventHandler(eventFiles, __dirname+"/events");
        client.commandHandler(commandFiles, __dirname+"/commands");
        client.login(process.env.TOKEN)
    
})();