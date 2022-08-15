const { guildId } = require("../../config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = (client) => {
    client.commandHandler = async () => {
        client.commandArray = [];

        const commandFolders = fs.readdirSync("./src/commands");

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

        (async () => {
            try {
                client.log.botinfo("Started refreshing application (/) commands.");

                await rest.put(
                    Routes.applicationCommands(process.env.APP_ID, guildId),
                    {
                        body: client.commandArray,
                    }
                );

                client.log.botinfo("Successfully reloaded application (/) commands.");
            } catch (error) {
                client.log.error(error);
                throw error;
            }
        })();
    };
};
