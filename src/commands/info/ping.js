const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

// Command to get info about the bots uptime and ping
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the bot status"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /ping command in #${interaction.channel.name}`);

        // Send message to calculate latency from
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const uptime = moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]");

        const ping_Embed = new EmbedBuilder()
            .setTitle("✨ Status ✨")
            .addFields(
                {
                    name: "Bot Uptime",
                    value: uptime.toString(),
                    inline: true,
                },
                {
                    name: "Latency",
                    value: `${message.createdTimestamp - interaction.createdTimestamp}ms`,
                    inline: true,
                },
                {
                    name: "API Latency",
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true,
                }
            )
            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            });

        await interaction.editReply({ content: "Pong!", embeds: [ping_Embed], ephemeral: true });

    },
};
