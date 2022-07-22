const { SlashCommandBuilder } = require('@discordjs/builders');

var theme = require('../themelist.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearlist')
        .setDescription('Clears theme list - admin only'), //command perms currently controlled in server settings not here
    defaultPermission: false,
    async execute(interaction) {
        console.log('Clear list attempt');
        theme.length = 0;
        await interaction.reply('List emptied');
        console.log(theme);
    },
};
