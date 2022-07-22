const { guildId } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.commandHandler = async (commandFiles, path) => {
        client.commandArray = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        };

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationCommands(process.env.APP_ID, guildId), {
                body: client.commandArray,
            });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

}};
