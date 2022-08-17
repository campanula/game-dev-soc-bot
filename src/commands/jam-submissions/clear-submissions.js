const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { read, write } = require("../../functions/misc-functions/saveToFile.js");

// Command to clear the submissions.txt and submissionsDict.txt files

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-submissions")
        .setDescription("Clears submission list - admin only")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /clear-submissions command in #${interaction.channel.name}`);

        const submissions = read("src/txt/jam-submissions/submissionsArray.txt"); // Open submissions.txt and put its contents into an array

        if (submissions.length === 0) {
            await interaction.reply({
                content: "The list is already empty!",
                ephemeral: true
            });
        } else {

            submissions.length = 0;
            const dict = {};

            // Write the empty dict and array to the files to overwrite the current contents
            write(dict, "src/txt/jam-submissions/submissionsDict.txt");
            write(submissions, "src/txt/jam-submissions/submissionsArray.txt");

            const clear_Embed = new EmbedBuilder()
                .setDescription(`List cleared\nThere are now ${submissions.length} submissions in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [clear_Embed] });
        }
    }
}
