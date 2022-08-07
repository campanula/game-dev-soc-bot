const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-submissions")
        .setDescription("Clears submission list - admin only"), //command perms currently controlled in server settings not here
    defaultPermission: false,
    async execute(interaction) {
        const submissions = read("src/txt/submissions.txt");

        if (submissions.length === 0) {
            await interaction.reply({
                content: "The list is already empty!",
                ephemeral: true
            });
        } else {

            submissions.length = 0;
            const dict = {}
            write(dict, "src/txt/submissionsDict.txt");
            write(submissions, "src/txt/submissions.txt");

            const clear_Embed = new MessageEmbed()
                .setDescription(`List cleared\nThere are now ${submissions.length} submissions in the list.`)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })


            await interaction.reply({ embeds: [clear_Embed] });
        }
    }
}
