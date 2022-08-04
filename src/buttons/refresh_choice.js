const { MessageEmbed } = require('discord.js');

let theme = require('../themelist.js');

module.exports = {
    data: {
        name: 'refresh_choice'
    },
    async execute(interaction, client) {
        if (theme.length != 0) {
            const random = Math.floor(Math.random() * theme.length);
            console.log(theme[random]);

            const choice_Embed = new MessageEmbed()
                .setDescription('I have chosen the theme: ' + theme[random])
                .setColor('BLURPLE')
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [choice_Embed] });

        } else {
            await interaction.reply('List is empty');
        }
    }
}
