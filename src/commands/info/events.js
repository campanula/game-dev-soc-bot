const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");

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
            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`,
            });

        // Get current events from file
        const dict = read("src/txt/info/events.txt");

        for (const [key, val] of Object.entries(dict)) {
            eventEmbed.addFields(
                {
                    name: key,
                    value: val,
                    inline: true,
                }
            )
        }

        await interaction.reply({ embeds: [eventEmbed], files: [file] });
    },
};
