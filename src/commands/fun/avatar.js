const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get a users avatar!")
        .addUserOption(option => option.setName("target").setDescription("The user")),

    async execute(interaction, client) {
        const target = interaction.options.getUser("target");

        if (!target) {
            let userEmbed = new MessageEmbed()
                .setTitle(`${interaction.user.username}'s avatar`)
                .setImage(interaction.member.user.avatarURL({ size: 1024 }))
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("PNG")
                        .setURL("https://cdn.discordapp.com/avatars/" + interaction.user.id + "/" + interaction.user.avatar + ".png?size=1024")
                        .setStyle("LINK"),

                    new MessageButton()
                        .setLabel("WEBP")
                        .setURL("https://cdn.discordapp.com/avatars/" + interaction.user.id + "/" + interaction.user.avatar + ".webp?size=1024")
                        .setStyle("LINK"),

                    new MessageButton()
                        .setLabel("JPEG")
                        .setURL("https://cdn.discordapp.com/avatars/" + interaction.user.id + "/" + interaction.user.avatar + ".jpeg?size=1024")
                        .setStyle("LINK")
                )

            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });

        } else {
            let userEmbed = new MessageEmbed()
                .setTitle(`${target.username}'s avatar`)
                .setImage(target.avatarURL({ size: 1024 }))
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })


            let row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("PNG")
                        .setURL("https://cdn.discordapp.com/avatars/" + target.id + "/" + target.avatar + ".png?size=1024")
                        .setStyle("LINK"),

                    new MessageButton()
                        .setLabel("WEBP")
                        .setURL("https://cdn.discordapp.com/avatars/" + target.id + "/" + target.avatar + ".webp?size=1024")
                        .setStyle("LINK"),

                    new MessageButton()
                        .setLabel("JPEG")
                        .setURL("https://cdn.discordapp.com/avatars/" + target.id + "/" + target.avatar + ".jpeg?size=1024")
                        .setStyle("LINK")
                )

            await interaction.reply({
                embeds: [userEmbed],
                components: [row]
            });
        }
    }
}
