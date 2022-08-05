const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { read } = require("../../saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("submissions")
        .setDescription("Prints all jam submissions"),
    async execute(interaction) {
        console.log("Print sub attempt");

        submissions = read("src/txt/submissions.txt"); // Read submissions from file then print

        if (submissions.length != 0) {

            let subPrint = submissions.join("\n")

            const submit_Embed = new MessageEmbed()
                .setTitle("All submissions")
                .setDescription(subPrint.toString())
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [submit_Embed] });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
