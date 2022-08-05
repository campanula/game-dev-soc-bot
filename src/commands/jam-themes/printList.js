const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("print")
        .setDescription("Prints jam list"),
    async execute(interaction) {
        let theme = read("src/txt/themes.txt");
        console.log(theme);
        console.log(theme.length);

        if (theme.length != 0) {
            console.log(theme);
            let themePrint = theme.join(",  ")

            const print_Embed = new MessageEmbed()
                .setTitle("Theme List")
                .setDescription(themePrint.toString())
                .setColor("BLURPLE")
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
