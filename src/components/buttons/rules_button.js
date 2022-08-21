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
            .setDescription(
                `You can apply for this jam individually or in teams of up to 4 people. For the current jam's theme and its deadline, check #🎺announcements.

            **Rules**
            >>> 1. The game must link to the prompt in some way.
            2. Any language or game engine is allowed.
            3. The game must be developed during the current game jam.
            4. The majority of the game must be your own work. Submitting someone elses game is not allowed.
            5. External art/packages/assets are allowed, but they must be clearly sourced.
            6. The game executable must be hosted somewhere (GameJolt, GitHub, itch.io) and sent to us before the deadline.
            7. The game code must be added to the Github repo provided to you after signing up.
            8. Please do not add your assets to the provided Github repo, as there isn't enough space.
            9. Everything must be published to the repo and hosted somewhere before the deadline.`)

            .setColor("#5865F2")
            .setTimestamp()
            .setFooter({
                text: `Triggered by ${interaction.user.tag}`
            });

        await interaction.reply({
            embeds: [rulesEmbed],
            ephemeral: true
        });

    },
};
