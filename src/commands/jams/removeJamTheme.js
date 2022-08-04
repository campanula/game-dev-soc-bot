const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

let theme = require('../../themelist.js');

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
            
            const delete_Embed = new MessageEmbed()
            .setDescription('Theme ' + value + ' deleted from list\nThere are now ' + theme.length + ' themes in the list.')
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })
            await interaction.reply({ embeds: [delete_Embed] });
        } else {
            await interaction.reply({content: 'Could not remove theme', ephemeral: true});
        }

        console.log(theme);
    }
}
