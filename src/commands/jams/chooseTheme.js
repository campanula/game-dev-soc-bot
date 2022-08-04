const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

let theme = require("../../themelist.js");
const {read} = require("../../saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choosetheme")
        .setDescription("Chooses a theme from list"),
    async execute(interaction) {
        theme = read("src/txt/themes.txt");

        if (theme.length != 0) {
            const random = Math.floor(Math.random() * theme.length);
            console.log(theme[random]);

            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Refresh")
                        .setCustomId("refresh_choice")
                        .setStyle("PRIMARY")
                )

            const choice_Embed = new MessageEmbed()
                .setDescription("I have chosen the theme: " + theme[random])
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
