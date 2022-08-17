const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");
const fs = require("fs");

// Command to get the last winner from the file the variable is stored in
module.exports = {
    data: new SlashCommandBuilder()
        .setName("winner")
        .setDescription("Prints the last game jam winner - admin only")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /winner command in #${interaction.channel.name}`);

        // Using files so that its easier to change and save the variables without hardcoding them in each time
        const winner = fs.readFileSync("src/txt/jam-submissions/saveWinningTeam.txt");
        const currentJam = read("src/txt/jam-misc/currentJam.txt");

        if (winner.length === 0) {
            await interaction.reply({ content: "There is no winner", ephemeral: true });
        } else {
            const results_Embed = new EmbedBuilder()
                .setTitle(`✨ Game Jam Winner - ${currentJam} ✨`)
                .setDescription(`The winner of the last game jam was 🎈 team ${winner}!! 🎈`)
                .setColor("#5865F2")
                .setTimestamp()

            await interaction.reply({ embeds: [results_Embed] });
        }

    },
};
