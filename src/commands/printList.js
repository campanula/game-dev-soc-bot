const { SlashCommandBuilder } = require('@discordjs/builders');

var theme = require('../themelist.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('print')
        .setDescription('Prints jam list'),
    async execute(interaction) {
        console.log(theme)
        await interaction.reply(theme.toString())
    }
};

