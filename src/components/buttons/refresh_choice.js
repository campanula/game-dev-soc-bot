const { EmbedBuilder } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");

// Button to choose a theme
module.exports = {
    data: {
        name: "refresh_choice",
    },
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} clicked the refresh_choice button in #${interaction.channel.name}`);

        const theme = read("src/txt/jam-misc/themes.txt");

        if (theme.length !== 0) {
            const random = Math.floor(Math.random() * theme.length);

            const choice_Embed = new EmbedBuilder()
                .setDescription(`I have chosen the theme: ${theme[random]}`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`,
                });

            await interaction.reply({ embeds: [choice_Embed] });
        } else {
            await interaction.reply("List is empty");
        }
    },
};
