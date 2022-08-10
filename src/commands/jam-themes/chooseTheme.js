const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choose-theme")
        .setDescription("Chooses a theme from list"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /choose-theme command in #${interaction.channel.name}`);

        const theme = read("src/txt/themes.txt");

        if (theme.length !== 0) {
            const random = Math.floor(Math.random() * theme.length);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Refresh")
                        .setCustomId("refresh_choice")
                        .setStyle(ButtonStyle.Primary)
                )

            const choice_Embed = new EmbedBuilder()
                .setDescription(`I have chosen the theme: ${theme[random]}`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({
                embeds: [choice_Embed],
                components: [row]
            });
        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }

    }
}
