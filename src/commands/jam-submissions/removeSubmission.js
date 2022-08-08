const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-submission")
        .setDescription("Remove a submission from the list - admin only")
        .addStringOption(option =>
            option.setName("team")
                .setDescription("The team to remove")
                .setRequired(true)),
    defaultPermission: false,
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /remove-submission command in #${interaction.channel.name}`);

        const dict = read("src/txt/submissionsDict.txt");
        const submissions = read("src/txt/submissions.txt");

        const value = interaction.options.getString("team");

        if (value in dict) {
            delete dict[value]
            write(dict, "src/txt/submissionsDict.txt");

            submissions.length = 0;

            for (const [key, val] of Object.entries(dict)) { //Add dict entries to array then save to file
                const entry = `Team ${key}'s submission: ${val}`
                submissions.push(entry);
            }

            write(submissions, "src/txt/submissions.txt");

            const delete_Embed = new MessageEmbed()
                .setDescription(`Team ${value} deleted from list\nThere are now ${submissions.length} teams in the list.`)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })
            await interaction.reply({ embeds: [delete_Embed] });
        } else {
            await interaction.reply({ content: "Could not remove team", ephemeral: true });
        }

    }
}
