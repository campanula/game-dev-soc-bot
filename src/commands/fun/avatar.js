const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get a users avatar!")
        .addUserOption(option => option.setName("target").setDescription("The user")),

    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /avatar command in #${interaction.channel.name}`);

        const target = interaction.options.getUser("target");

        if (!target) {
            const userEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.username}'s avatar`)
                .setImage(interaction.member.user.avatarURL({ size: 1024 }))
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("PNG")
                        .setURL(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`)
                        .setStyle(ButtonStyle.Link),

                    new ButtonBuilder()
                        .setLabel("WEBP")
                        .setURL(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp?size=1024`)
                        .setStyle(ButtonStyle.Link),

                    new ButtonBuilder()
                        .setLabel("JPEG")
                        .setURL(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.jpeg?size=1024`)
                        .setStyle(ButtonStyle.Link)
                )

            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });

        } else {
            const userEmbed = new EmbedBuilder()
                .setTitle(`${target.username}'s avatar`)
                .setImage(target.avatarURL({ size: 1024 }))
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })


            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("PNG")
                        .setURL(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png?size=1024`)
                        .setStyle(ButtonStyle.Link),

                    new ButtonBuilder()
                        .setLabel("WEBP")
                        .setURL(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.webp?size=1024`)
                        .setStyle(ButtonStyle.Link),

                    new ButtonBuilder()
                        .setLabel("JPEG")
                        .setURL(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.jpeg?size=1024`)
                        .setStyle(ButtonStyle.Link)
                )

            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });
        }
    }
}
