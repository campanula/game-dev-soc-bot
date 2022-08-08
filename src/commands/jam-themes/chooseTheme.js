const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
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

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Refresh")
                        .setCustomId("refresh_choice")
                        .setStyle("PRIMARY")
                )

            const choice_Embed = new MessageEmbed()
                .setDescription(`I have chosen the theme: ${theme[random]}`)
                .setColor("BLURPLE")
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
