const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
let dict = require("../../submissionDict.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("submissions")
        .setDescription("Prints all jam submissions"),
    async execute(interaction) {
        console.log("Print sub attempt");

        let isEmp = Object.keys(dict).length === 0; //Check if dictionary is empty

        if (!isEmp) {
            console.log(dict);

            const submit_Embed = new MessageEmbed()
                .setTitle("All submissions")
                .setDescription(JSON.stringify(dict))
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
