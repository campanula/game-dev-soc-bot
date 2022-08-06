const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { readTxt } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("winner")
        .setDescription("Prints the last game jam winner - admin only"),
    async execute(interaction) {
        let winner = readTxt("src/txt/saveWinningTeam.txt");
        let currentJam = readTxt("src/txt/currentJam.txt");

        if (winner.length === 0) {
            await interaction.reply({ content: "There is no winner", ephemeral: true });
        } else {
            let resultsPrint = "The winner of the last game jam was 🎈 team " + winner + "!! 🎈";

            const results_Embed = new MessageEmbed()
                .setTitle("✨ Game Jam Winner - " + currentJam + " ✨")
                .setDescription(resultsPrint)
                .setColor("BLURPLE")
                .setTimestamp()

            await interaction.reply({ embeds: [results_Embed] });
        }

    },
};
