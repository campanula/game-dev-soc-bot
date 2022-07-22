const { SlashCommandBuilder } = require('@discordjs/builders');

var theme = require('../themelist.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetheme')
        .setDescription('Remove a theme from the list - admin only')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The theme to remove')
                .setRequired(true)),
    defaultPermission: false,
    async execute(interaction) {
        console.log('Remove theme attempt');
        const value = interaction.options.getString('input');

        const index = theme.indexOf(value);
        if (index > -1) { // splice array when item is found
            theme.splice(index, 1); // Splice on input, remove 1 item only
            await interaction.reply('Theme removed from list');
        } else {
            await interaction.reply('Could not remove theme');
        }

        console.log(theme);
    }
}
