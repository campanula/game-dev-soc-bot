const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

// Command to send a message congratulating another user
module.exports = {
    data: new SlashCommandBuilder()
        .setName("congrats")
        .setDescription("Congratulate a user!")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The user")),

    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /congrats command in #${interaction.channel.name}`); // Logging interaction with Winston

        const target = interaction.options.getUser("target"); // Get the user input as the target

        if (!target) { // If no user was input as target, send an ephemeral reply telling command user that they must add a target
            await interaction.reply({
                content: "You need to choose a target!",
                ephemeral: true
            });
        } else { // if a user was input as target

            // Create embed to add to message
            const userEmbed = new EmbedBuilder()
                .setTitle("Congrats!")
                .setImage("https://cdn.discordapp.com/attachments/1000126955024285736/1004531350394634380/clapping-applause.gif")
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            // Send reply to interaction with embed, tagging both the target user and command user
            await interaction.reply({
                content: `<@${interaction.user.id}> says well done to <@${target.id}>!`,
                embeds: [userEmbed]
            });
        }
    }
}
