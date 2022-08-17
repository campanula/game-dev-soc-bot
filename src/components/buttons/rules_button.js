const { EmbedBuilder } = require("discord.js");

// Button to choose a theme
module.exports = {
    data: {
        name: "rules_button",
    },
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} clicked the rules_button button in #${interaction.channel.name}`);

        const rulesEmbed = new EmbedBuilder()
            .setTitle("GDS Jam Rules")
            .setDescription("You can apply for this jam individually or in teams of up to 4 people. For the current jam's theme and its deadline, check #🎺announcements.\n\n**Rules**\n >>> 1. The game must link to the prompt in some way.\n2. Any language or game engine is allowed.\n3. The game must be developed during the current game jam.\n4. The majority of the game must be your own work. Submitting someone elses game is not allowed.\n5. External art/packages/assets are allowed, but they must be clearly sourced.\n6. The game executable must be hosted somewhere (GameJolt, GitHub, itch.io) and sent to us before the deadline.\n7. The game code must be added to the Github repo provided to you after signing up.\n8. Please do not add your assets to the provided Github repo, as there isn't enough space.\n9. Everything must be published to the repo and hosted somewhere before the deadline.")
            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            })

        await interaction.reply({
            embeds: [rulesEmbed],
            ephemeral: true
        });

    },
};
