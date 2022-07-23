const { SlashCommandBuilder } = require('@discordjs/builders');

let theme = require('../themelist.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('print')
        .setDescription('Prints jam list'),
    async execute(interaction) {
        if (theme.length != 0) {
            console.log(theme);
            await interaction.reply(theme.toString());
        } else {
            await interaction.reply('List is empty');
        }
    }
}
