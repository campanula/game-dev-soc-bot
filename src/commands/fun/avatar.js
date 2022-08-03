const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a users avatar!')
        .addUserOption(option => option.setName('target').setDescription('The user')),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
            
            if (!target){
                let userEmbed = new MessageEmbed()
                    .setTitle(`${interaction.user.username}'s avatar`)
                    .setImage(interaction.member.user.avatarURL({size: 1024}))
                    .setColor('BLURPLE')
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({ embeds: [userEmbed] });

            } else {
                let userEmbed = new MessageEmbed()
                    .setTitle(`${target.username}'s avatar`)
                    .setImage(target.avatarURL({size: 1024}))
                    .setColor('BLURPLE')
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({ embeds: [userEmbed] });   
            } 
    }
}
