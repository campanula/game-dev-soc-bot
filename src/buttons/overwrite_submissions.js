const { MessageEmbed } = require("discord.js");
const { read, write } = require("../saveArray.js");

module.exports = {
    data: {
        name: "overwrite_submissions",
    },

    async execute(interaction) {
        let dict, submissions, team;
        console.log("Remove submission attempt");

        dict = read("src/txt/submissionsDict.txt");
        submissions = read("src/txt/submissions.txt");
        team = read("src/txt/saveTeam.txt");

        if (team in dict) {
            delete dict[team]
            write(dict, "src/txt/submissionsDict.txt");

            submissions.length = 0;
            for (const [key, val] of Object.entries(dict)) { //Add dict entries to array then save to file
                let entry = "Team " + key + "'s submission: " + val
                submissions.push(entry);
            }

            write(submissions, "src/txt/submissions.txt");

            const clear_Embed = new MessageEmbed()
                .setDescription("Team " + team + "'s submission removed from list\nThere are now " + submissions.length + " submissions in the list.\nYou can now add your new submission.")
                .setColor("BLURPLE")
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

