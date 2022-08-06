const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActivityType } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("winner")
        .setDescription("Prints the last game jam winner - admin only"),
    async execute(interaction) {
        let winner = read("src/txt/saveVote.txt");
        let currentJam = read("src/txt/currentJam.txt");

        if (!winner) {
            await interaction.reply({ content: "There is no winner", ephemeral: true });
        } else {
            let resultsPrint = "The winner of the last game jam was team 🎈" + winner + "!! 🎈";

            const results_Embed = new MessageEmbed()
                .setTitle("✨ Game Jam Winner - " + currentJam + " ✨")
                .setDescription(resultsPrint)
                .setColor("BLURPLE")
                .setTimestamp()

            await interaction.reply({ embeds: [results_Embed] });
        }

    },
};
