const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("signup")
        .setDescription("Sign up to our current jam!"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /signup command in #${interaction.channel.name}`);

        // Using files so that its easier to change the name of the jam without hardcoding it in everywhere each time
        const currentJam = read("src/txt/jam-misc/currentJam.txt");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("🎮 Open Form")
                    .setCustomId("signup_button")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel("💡 Check the rules")
                    .setCustomId("rules_button")
                    .setStyle(ButtonStyle.Secondary)
            )

        const signupEmbed = new EmbedBuilder()
            .setTitle(`Sign up to the GDS ${currentJam}!`)
            .setDescription("Click the 'Open Form' button below to open the sign-up form for the current game jam, or click the rules button for a recap on our general game jam rules. You can enter individually, or in teams of up to 4 people.")
            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            });

        await interaction.reply({
            embeds: [signupEmbed],
            components: [row],
            ephemeral: true
        });

    },
};
