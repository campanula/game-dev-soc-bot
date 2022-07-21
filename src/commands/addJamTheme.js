const { SlashCommandBuilder } = require('@discordjs/builders');

var theme = require('../themelist.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtheme')
        .setDescription('Add a game jam theme idea to the list!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The theme to add')
                .setRequired(true)),
    async execute(interaction, client) {
        console.log("Add theme attempt");
        const SpamOn = interaction.options.getString('input');
        theme.push(SpamOn);
        console.log(theme);
        await interaction.reply('Theme added to list')
    }
};

