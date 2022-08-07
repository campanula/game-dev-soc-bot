const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");
const { validUrl } = require("../../misc/checkURL.js");

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
        const sub = interaction.options.getString("submission");
        const team = interaction.options.getString("team");
        const dict = read("src/txt/submissionsDict.txt");

        if (isNaN(Number(team)) || !validUrl(sub)) { // Add validation for team numbers and submissions
            const invalid_Embed = new MessageEmbed()
                .setTitle("Invalid Submission")
                .setDescription("Below are some possible reasons your submission was not accepted.")
                .addFields(
                    {
                        name: "Check your team name is valid!",
                        value: "Please enter the number for your team (e.g., 7)",
                        inline: true,
                    },
                    {
                        name: "Check your submission is valid!",
                        value: "Your submission must be from the websites https://github.com, https://itch.io, and https://gamejolt.com\nYour submission must also be a valid url starting with http:// or https://\nAn example of a valid submission could be https://ninja-muffin24.itch.io/funkin",
                        inline: true,
                    })
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [invalid_Embed], ephemeral: true });

        } else if (team in dict) {
            write(team, "src/txt/saveTeam.txt");

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Delete")
                        .setCustomId("overwrite_submissions")
                        .setStyle("PRIMARY")
                )

            const overwrite_Embed = new MessageEmbed()
                .setTitle("Team already exists in database")
                .setDescription(`Team ${team}, would you like to delete your previous submission?`)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [overwrite_Embed], components: [row], ephemeral: true });

        } else {

            // Store values in dictionary for validation
            dict[team] = sub.toString(); // Create key value pair for team and their submission
            write(dict, "src/txt/submissionsDict.txt");

            // Store values in array for printing
            const allEntries = [];
            for (const [key, val] of Object.entries(dict)) { //Add dict entries to array then save to file
                const entry = `Team ${key}'s submission: ${val}`
                allEntries.push(entry);
            }

            write(allEntries, "src/txt/submissions.txt");

            const submit_Embed = new MessageEmbed()
                .setTitle("Submission added")
                .setDescription(`Submission ${sub} has been added for team ${team}`)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [submit_Embed] });
        }
    },
};
