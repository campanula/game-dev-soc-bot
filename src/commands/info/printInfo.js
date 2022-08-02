const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('All the links and info for Essex GDS!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('society')
                .setDescription('Info about the society'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Info about the bot')),

    async execute(interaction) {
        console.log('Print info');
        if (interaction.options.getSubcommand() === 'society'){
            const societyEmbed = new MessageEmbed()
            .setTitle('Essex Game Dev Society')
            .setDescription('All the info and links you need :)')
            .addFields(
                {name: 'Join  the society!', value: 'Join here: https://www.essexstudent.com/society/gamedevsociety/', inline: true},
                {name: 'Linktree', value: 'Find all our other socials: https://linktr.ee/essexGDS ', inline: true}
            )
            .setURL('https://github.com/campanula/game-dev-soc-bot')
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })
        
            await interaction.reply({ embeds: [societyEmbed] });
        
        } else if (interaction.options.getSubcommand() === 'bot'){
            const botEmbed = new MessageEmbed()
            .setTitle('GDS Bot')
            .addFields(
                {name: 'Link to repo', value: 'https://github.com/campanula/game-dev-soc-bot'},
            )
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })

            await interaction.reply({ embeds: [botEmbed] });

        } else {
            await interaction.reply('Please use a sub-command');
        }

    },
}
