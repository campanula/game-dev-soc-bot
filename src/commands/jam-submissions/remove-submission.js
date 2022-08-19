const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { read, write } = require("../../functions/misc-functions/saveToFile.js");

// Command to remove a submission
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-submission")
        .setDescription("Remove a submission from the list - admin only")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption(option =>
            option.setName("team")
                .setDescription("The team to remove")
                .setRequired(true)),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /remove-submission command in #${interaction.channel.name}`);

        let dict = read("src/txt/jam-submissions/submissionsDict.txt"); // Get dict from file
        const value = interaction.options.getString("team");

        if (value in dict) {

            const removeSubmission = () => {
                delete dict[value];
                return dict;
            }

            dict = removeSubmission();

            const writeNewList = () => {
                const submissions = [];
                for (const [key, val] of Object.entries(dict)) { // Add dict entries to array 
                    const entry = `Team ${key}'s submission: ${val}`;
                    submissions.push(entry);
                }

                return submissions;
            }

            const submissions = writeNewList();

            write(dict, "src/txt/jam-submissions/submissionsDict.txt"); // Overwrite submissions dict and array
            write(submissions, "src/txt/jam-submissions/submissionsArray.txt");

            const delete_Embed = new EmbedBuilder()
                .setDescription(`Team ${value} deleted from list\nThere are now ${submissions.length} teams in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })
            await interaction.reply({ embeds: [delete_Embed] });
        } else {
            await interaction.reply({ content: "Could not remove team", ephemeral: true });
        }
    },
};
