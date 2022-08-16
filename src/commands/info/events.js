const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

// Command to print current society events
module.exports = {
    data: new SlashCommandBuilder()
        .setName("events")
        .setDescription("Info about current society events"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /events command in #${interaction.channel.name}`);

        const file = new AttachmentBuilder('./src/images/logo.png');

        const eventEmbed = new EmbedBuilder()
            .setTitle("Current Events")
            .setDescription("Links to all our current events")
            .setThumbnail("attachment://logo.png")
            .addFields(
                {
                    name: "Summer Game Jam Event Page",
                    value: "https://www.essexstudent.com/events/12079/25962/",
                    inline: true,
                },
                {
                    name: "Link to sign up to jam",
                    value: "https://forms.gle/4kHQtt9e1YN5FBM39",
                    inline: true,
                }
            )
            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`,
            });

        await interaction.reply({ embeds: [eventEmbed], files: [file] });
    },
};
