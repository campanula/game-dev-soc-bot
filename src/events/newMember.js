const { channelId } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
		console.log(member.user);
        let welcomeChannel = member.guild.channels.cache.get(channelId)
        welcomeChannel.send(`${member.user} has joined the server!`);

        const welcomeEmbed = new MessageEmbed()
            .setTitle(`Welcome, ${member.user.username}!`)
            .setDescription('Thanks for joining!')
            .addFields(
                {name: 'Not a society member?', value: 'You can join for free here! \nhttps://www.essexstudent.com/society/gamedevsociety/ '},
                {name: 'Joined and looking for that cool member role? 👀', value: 'Message one of the executives with your PRID and name!'},
                {name: 'Need some roles?', value: 'Make sure to pick up your other roles in #🎓roles for access to exclusive channels!'},
                {name: 'Need game dev help?', value: 'Check out #🙌game-dev-help or #📚game-dev-resources'}
            )
            .setColor('BLURPLE')
            .setTimestamp()
        
        welcomeChannel.send({ embeds: [welcomeEmbed] });
	}
}
