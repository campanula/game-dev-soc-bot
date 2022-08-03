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
                .setDescription('Info about the bot'))
         .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user'))),

    async execute(interaction) {
        console.log('Print info');

        switch (interaction.options.getSubcommand()){
            case 'society':
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
            break;

            case 'bot':
                const botEmbed = new MessageEmbed()
                    .setTitle('GDS Bot')
                    .addFields(
                        {name: 'Link to repo', value: 'https://github.com/campanula/game-dev-soc-bot'}
                    )
                    .setColor('BLURPLE')
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })
    
                await interaction.reply({ embeds: [botEmbed]});
            break;

            case 'user':
                const target = interaction.options.getUser('target');
                
                if (!target){
                    let userEmbed = new MessageEmbed()
                        .setTitle('User Info')
                        .setThumbnail("https://cdn.discordapp.com/avatars/"+interaction.user.id+"/"+interaction.user.avatar+".jpeg")
                        .addFields(
                            {name: 'Name', value: `${interaction.user.tag}`, inline: true},
                            {name: 'ID', value: `${interaction.user.id}`, inline: true}
                        )
                        .setColor('BLURPLE')
                        .setTimestamp()
                        .setFooter({
                            text: `Triggered by ${interaction.user.tag}`
                        })

                    await interaction.reply({ embeds: [userEmbed] });

                } else {
                    let userEmbed = new MessageEmbed()
                        .setTitle('User Info')
                        .setThumbnail("https://cdn.discordapp.com/avatars/"+target.id+"/"+target.avatar+".jpeg")
                        .addFields(
                            {name: 'Name', value: `${target.tag}`, inline: true},
                            {name: 'ID', value: `${target.id}`, inline: true}
                        )
                        .setColor('BLURPLE')
                        .setTimestamp()
                        .setFooter({
                            text: `Triggered by ${interaction.user.tag}`
                        })

                    await interaction.reply({ embeds: [userEmbed] });   
                } 

            break;

            default:
                await interaction.reply('Invalid command');
            break;
        }
    },
}
