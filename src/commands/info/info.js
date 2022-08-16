const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const moment = require("moment");

// Command to print various info according to its subcommands
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("All the links and info for Essex GDS!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("society")
                .setDescription("Info about the society"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("bot")
                .setDescription("Info about the bot"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("Info about a user")
                .addUserOption(option => option.setName("target").setDescription("The user"))),

    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /info command in #${interaction.channel.name}`);

        const file = new AttachmentBuilder('./src/images/logo.png');

        switch (interaction.options.getSubcommand()) {
            case "society": {

                const societyEmbed = new EmbedBuilder()
                    .setTitle("Essex Game Dev Society")
                    .setDescription("All the info and links you need :)")
                    .setThumbnail("attachment://logo.png")
                    .addFields(
                        {
                            name: "Join  the society!",
                            value: "Join here: https://www.essexstudent.com/society/gamedevsociety/",
                            inline: true
                        },
                        {
                            name: "Linktree",
                            value: "Find all our other socials: https://linktr.ee/essexGDS",
                            inline: true
                        }
                    )
                    .setURL("https://github.com/campanula/game-dev-soc-bot")
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({ embeds: [societyEmbed], files: [file] });
                break;
            }
            case "bot": {

                const botEmbed = new EmbedBuilder()
                    .setTitle("GDS Bot")
                    .addFields(
                        { name: "Link to repo", value: "https://github.com/campanula/game-dev-soc-bot" }
                    )
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({ embeds: [botEmbed] });
                break;
            }
            case "user": {
                const target = interaction.options.getUser("target");

                if (!target) { // if command user has not specified a target user, get info of command user

                    const userEmbed = new EmbedBuilder()
                        .setTitle("User Info")
                        .setThumbnail(interaction.member.user.avatarURL({ size: 256 }))
                        .addFields(
                            { name: "Name", value: `${interaction.user.tag}`, inline: true },
                            { name: "ID", value: `${interaction.user.id}`, inline: true },
                            {
                                name: "Nickname",
                                value: `${interaction.user.id.displayName ?? interaction.user.username}`,
                                inline: true
                            },
                            { name: "Status", value: `${interaction.user.presence?.status ?? "offline"}`, inline: true },
                            {
                                name: "Game",
                                value: `${interaction.user.presence?.game ? interaction.user.presence?.game.name : "None"}`,
                                inline: true
                            },
                            { name: "Bot?", value: `${interaction.user.bot}`, inline: true },
                            {
                                name: "Server Join Date",
                                value: `${moment.utc(interaction.user.joinedAt).format("dddd, MMMM Do YYYY")}`,
                                inline: true
                            },
                            {
                                name: "Account Creation Date",
                                value: `${moment.utc(new Date(interaction.user.createdTimestamp)).format("dddd, MMMM Do YYYY")}`,
                                inline: true
                            }
                        )
                        .setColor("#5865F2")
                        .setTimestamp()
                        .setFooter({
                            text: `Triggered by ${interaction.user.tag}`
                        })

                    await interaction.reply({ embeds: [userEmbed] });

                } else { // if command user has specified a target user, get info of target user

                    const userEmbed = new EmbedBuilder()
                        .setTitle("User Info")
                        .setThumbnail(target.avatarURL({ size: 256 }))
                        .addFields(
                            { name: "Name", value: `${target.tag}`, inline: true },
                            { name: "Nickname", value: `${target.id.displayName ?? target.username}`, inline: true },
                            { name: "ID", value: `${target.id}`, inline: true },
                            { name: "Status", value: `${target.presence?.status ?? "offline"}`, inline: true },
                            {
                                name: "Game",
                                value: `${target.presence?.game ? target.presence?.game.name : "None"}`,
                                inline: true
                            },
                            { name: "Bot?", value: `${target.bot}`, inline: true },
                            {
                                name: "Server Join Date",
                                value: `${moment.utc(target.joinedAt).format("dddd, MMMM Do YYYY")}`,
                                inline: true
                            },
                            {
                                name: "Account Creation Date",
                                value: `${moment.utc(new Date(target.createdTimestamp)).format("dddd, MMMM Do YYYY")}`,
                                inline: true
                            }
                        )
                        .setColor("#5865F2")
                        .setTimestamp()
                        .setFooter({
                            text: `Triggered by ${interaction.user.tag}`
                        })

                    await interaction.reply({ embeds: [userEmbed] });
                }

                break;
            }
            default: {
                await interaction.reply({
                    content: "Invalid Command",
                    ephemeral: true
                });
                break;
            }
        }
    },
}
