const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("themes")
        .setDescription("Prints jam list"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /themes command in #${interaction.channel.name}`);


        const theme = read("src/txt/themes.txt");

        if (theme.length !== 0) {
            const themePrint = theme.join(",  ")

            const print_Embed = new EmbedBuilder()
                .setTitle("Theme List")
                .setDescription(themePrint.toString())
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [print_Embed] });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
