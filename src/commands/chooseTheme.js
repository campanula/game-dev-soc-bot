const { SlashCommandBuilder } = require('@discordjs/builders');

var theme = require('../themelist.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choosetheme')
        .setDescription('Chooses a theme from list'),
    async execute(interaction) {
        if (theme.length != 0) {
            const random = Math.floor(Math.random() * theme.length);
            console.log(theme[random]);
            await interaction.reply("I have chosen the theme: " + theme[random])
        } else {
            await interaction.reply("List is empty")
        }
    }
};

