const { EmbedBuilder } = require("discord.js");
const { read, write } = require("../misc/saveArray.js");

module.exports = {
    data: {
        name: "overwrite_submissions",
    },

    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} clicked the overwrite_submissions button in #${interaction.channel.name}`);

        const dict = read("src/txt/submissionsDict.txt");
        const submissions = read("src/txt/submissions.txt");
        const team = read("src/txt/saveTeam.txt");

        if (team in dict) {
            delete dict[team]
            write(dict, "src/txt/submissionsDict.txt");

            submissions.length = 0;
            for (const [key, val] of Object.entries(dict)) { //Add dict entries to array then save to file
                const entry = `Team ${key}'s submission: ${val}`
                submissions.push(entry);
            }

            write(submissions, "src/txt/submissions.txt");

            const clear_Embed = new EmbedBuilder()
                .setDescription(`Team ${team}'s submission removed from list\nThere are now ${submissions.length} submissions in the list.\nYou can now add your new submission.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [clear_Embed] });
        } else {
            await interaction.reply({ content: "Error - please try adding your submission again", ephemeral: true });
        }

    },
};

