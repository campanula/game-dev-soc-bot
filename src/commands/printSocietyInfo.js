const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinus')
        .setDescription('All the links and info for Essex GDS!'),
    async execute(interaction, client) {
        console.log('Print info');

        const societyEmbed = new MessageEmbed()
            .setTitle('Essex Game Dev Society')
            .setDescription('All the info and links you need :)')
            .addFields(
                {name: 'Join  the society!', value: 'Join here: https://www.essexstudent.com/society/gamedevsociety/ ', inline: true},
                {name: 'Linktree', value: 'Find all our other socials: https://linktr.ee/essexGDS ', inline: true}
            )
            .setURL('https://github.com/campanula/game-dev-soc-bot')
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
                })

        await interaction.reply({ embeds: [societyEmbed] });
    }
}
