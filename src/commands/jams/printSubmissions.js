const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
let dict = require("../../submissionDict.js");
const { read, write } = require("../../saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("submissions")
        .setDescription("Prints all jam submissions"),
    async execute(interaction) {
        console.log("Print sub attempt");

        let isEmp = Object.keys(dict).length === 0; //Check if dictionary is empty

        if (!isEmp) {
            console.log(dict);

            submissions = read("src/txt/submissions.txt"); // Read submissions from file then print
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
