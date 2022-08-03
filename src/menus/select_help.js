const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'select_help'
    },
    async execute (interaction, client){
        switch(`${interaction.values}`){
            case 'info_help':
                const info_helpEmbed = new MessageEmbed()
                    .setTitle('All Info Commands')
                    .addFields(
                        {name: '/help', value: 'Get a list of all commands'},
                        {name: '/events', value: 'Get info on current society events'},
                        {name: '/ping', value: 'Ping'},
                        {name: '/info', value: 'Get info on either the bot, the society, or a user'}
                    )
                    .setColor('BLURPLE')
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({embeds: [info_helpEmbed] , ephemeral: true});
            break;

            case 'jam_help':
                const jam_helpEmbed = new MessageEmbed()
                .setTitle('All Jam Commands')
                .addFields(
                    {name: '/addtheme', value: 'Add a jam theme to the list'},
                    {name: '/choosetheme', value: 'Choose a jam theme from the list'},
                    {name: '/clearlist', value: 'Clear the list (admin only)'},
                    {name: '/print', value: 'Print the jam list'},
                    {name: '/removetheme', value: 'Remove a jam theme from the list (admin only)'}
                )
                .setColor('BLURPLE')
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

                await interaction.reply({embeds: [jam_helpEmbed] , ephemeral: true});               
            break;

            default:
                await interaction.reply({content: "Choose a valid option", ephemeral: true});            
            break;
        }

    }
}