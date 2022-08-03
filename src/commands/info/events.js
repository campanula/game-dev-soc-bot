const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('events')
        .setDescription('Info about current society events'),
    async execute(interaction) {
        console.log('events command triggered');

        const eventEmbed = new MessageEmbed()
            .setTitle('Current Events')
            .setDescription('Links to all our current events')
            .setThumbnail('https://cdn.discordapp.com/attachments/1000126955024285736/1004446804873588867/Essex2.png')
            .addFields(
                {name: 'Summer Game Jam Event Page', value: 'https://www.essexstudent.com/events/12079/25962/', inline: true},
                {name: 'Link to sign up to jam', value: 'https://forms.gle/4kHQtt9e1YN5FBM39', inline: true}
            )
            .setColor('BLURPLE')
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })

        await interaction.reply({ embeds: [eventEmbed] });
    }
}
