const { channelID } = require("../config.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member, client) {
        client.log.interinfo(`${member.user} joined the server`);

        const welcomeChannel = member.guild.channels.cache.get(channelID);
        welcomeChannel.send(`${member.user} has joined the server!`);

        const dmWelEmbed = new EmbedBuilder()
            .setTitle("Welcome to Essex GDS!")
            .setDescription("Thanks for joining the server! If you're not a society member, you can pick up a membership for free from https://www.essexstudent.com/society/gamedevsociety/")
            .setColor("#5865F2")
            .setTimestamp();

        member.send({ embeds: [dmWelEmbed] });

        const welcomeEmbed = new EmbedBuilder()
            .setTitle(`Welcome, ${member.user.username}!`)
            .setThumbnail(member.user.avatarURL({ size: 256 }))
            .setDescription("Thanks for joining!")
            .addFields(
                { name: "Not a society member?", value: "You can join for free here! \nhttps://www.essexstudent.com/society/gamedevsociety/" },
                { name: "Joined and looking for that cool member role? 👀", value: "Message one of the executives with your PRID and name!" },
                { name: "Need some roles?", value: "Make sure to pick up your other roles in #🎓roles for access to exclusive channels!" },
                { name: "Need game dev help?", value: "Check out #🙌game-dev-help or #📚game-dev-resources" }
            )
            .setColor("#5865F2")
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    }
}
