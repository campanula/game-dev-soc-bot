const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addtheme")
        .setDescription("Add a game jam theme idea to the list!")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("The theme to add")
                .setRequired(true)),
    async execute(interaction) {
        console.log("Add theme attempt");
        const value = interaction.options.getString("input");

        let theme = read("src/txt/themes.txt");
        theme.push(value);
        console.log(theme);

        write(theme, "src/txt/themes.txt");

        const add_Embed = new MessageEmbed()
            .setDescription("Theme " + value + " added to list\nThere are now " + theme.length + " themes in the list.")
            .setColor("BLURPLE")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })


        await interaction.reply({ embeds: [add_Embed] });
    }
}