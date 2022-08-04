const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

let dict = require("../../submissionDict.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("submit-entry")
        .setDescription("Adds a jam submission for a team")
        .addStringOption(option =>
            option.setName("submission")
                .setDescription("The submission to add")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("team")
                .setDescription("Enter your team number")
                .setRequired(true)),
    async execute(interaction) {
        console.log("Add sub attempt");
        const sub = interaction.options.getString("submission");
        const team = interaction.options.getString("team");

        dict[team] = sub; // Create key value pair for team and their submission
        console.log(dict);

            const submit_Embed = new MessageEmbed()
                .setTitle("Submission added")
                .setDescription("Submission " + sub + " has been added for team " + team)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [submit_Embed] });
    },
};
