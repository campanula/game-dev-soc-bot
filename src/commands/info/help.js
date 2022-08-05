const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageSelectMenu, MessageActionRow, MessageEmbed, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help with commands"),
    async execute(interaction) {
        console.log("help command triggered");

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("select_help")
                .setPlaceholder("Nothing selected")
                .addOptions(
                    {
                        label: "Info",
                        description: "List of info commands",
                        value: "info_help",
                    },
                    {
                        label: "Game Jams",
                        description: "List of game jam-related commands",
                        value: "jam_help",
                    },
                    {
                        label: "Fun",
                        description: "List of fun commands",
                        value: "fun_help",
                    }
                )
        );

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("Command Help")
            .setDescription("Choose a topic to see related commands");

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    },
};
