const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

// Command to send a select menu to print lists of all other commands
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help with commands"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /help command in #${interaction.channel.name}`); // Logging interaction with Winston

        // Create select menu to add to message
        const row = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
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

        // Create embed to add to message            
        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("Command Help")
            .setDescription("Choose a topic to see related commands");

        // Send reply to interaction with embed and select menu
        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    },
};
