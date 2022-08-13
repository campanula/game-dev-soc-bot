const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ButtonStyle } = require("discord.js");

// Command to send a users avatar as a message
module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get a users avatar!")
        .addUserOption(option => option.setName("target").setDescription("The user")),

    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /avatar command in #${interaction.channel.name}`); // Logging interaction with Winston

        const target = interaction.options.getUser("target"); // Get the user input as the target

        if (!target) { // If no user was added as target, get the avatar of the user using the command

            // Create embed with info and avatar
            const userEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.username}'s avatar`)
                .setImage(interaction.member.user.avatarURL({ size: 1024 }))
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            // Create row of buttons to add to embed
            // Each button will link to the image in a different file format
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

            // Send reply to interaction with embed and buttons
            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });

        } else { // If a user was added as target, get the avatar of the target
            // Create embed with info and avatar
            const userEmbed = new EmbedBuilder()
                .setTitle(`${target.username}'s avatar`)
                .setImage(target.avatarURL({ size: 1024 }))
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            // Create row of buttons to add to embed
            // Each button will link to the image in a different file format
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

            // Send reply to interaction with embed and buttons
            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });
        }
    }
}
