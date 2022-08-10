const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help with commands"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /help command in #${interaction.channel.name}`);

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

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("Command Help")
            .setDescription("Choose a topic to see related commands");

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    },
};
