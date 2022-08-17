const { SlashCommandBuilder } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");
const { getMaxVotes, toArray } = require("../../functions/misc-functions/voteFuncs.js");
const { voteEmbedFunc, resultsFunc, winnerFunc } = require("../../functions/misc-functions/storedEmbed.js");
const fs = require("fs");

// Command for reaction-based voting on submissions
module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Starts the game jam voting process with all uploaded submissions - admin only"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /vote command in #${interaction.channel.name}`);

        const submissions = read("src/txt/jam-submissions/submissionsArray.txt");
        const dict = read("src/txt/jam-submissions/submissionsDict.txt");

        if (submissions.length !== 0) {

            const emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];
            const emojiEntries = [];
            const emojiDict = {};

            // Get emojis
            for (const [key, val] of Object.entries(dict)) {
                const randEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                emojiDict[key] = randEmoji; // Store each team and its emoji together in emojiDict

                const entry = `${randEmoji} Team ${key}'s submission: ${val}`
                emojiEntries.push(entry); // Update array to add to message

                emojis.splice(randEmoji, 1); // Remove chosen emoji from emoji array
            }

            const submit_Embed = voteEmbedFunc(`${interaction.user.tag}`, emojiEntries);

            const message = await interaction.reply({ content: "This vote will last for 15min\nPlease wait 5 seconds before voting to ensure your vote is counted", embeds: [submit_Embed], fetchReply: true });

            const chosenEmojis = []; // array of the emojis picked for filter & for users
            try {
                for (const key in emojiDict) {
                    const val = emojiDict[key];
                    chosenEmojis.push(val); // and add emoji to array to be used in filter
                    await message.react(val); // For every emoji in emojiDict, set emoji as reaction
                }

            } catch (error) {
                client.log.error("One of the emojis failed to react:", error);
                throw error;
            }

            // Collector to get reactions
            const filter = (reaction) => {
                return chosenEmojis.includes(reaction.emoji.name);
            };

            const collector = message.createReactionCollector({ filter, time: 900000 });

            const votingDict = {};
            collector.on("collect", (reaction, user) => {
                client.log.interinfo(`Collected ${reaction.emoji.name} from ${user.tag}`);

                chosenEmojis.forEach(element => {
                    if (element === reaction.emoji.name) { // If the emoji matches the emojis added by the bot
                        votingDict[element] = (votingDict[element] || 0) + 1; // if it exists in the dict already add 1 - if not, add it 
                    }
                });

            });

            collector.on("end", collected => {
                message.reply("Voting concluded")
                client.log.interinfo(`Vote ended. Collected ${collected.size} items and votes: ${votingDict}`);

                const resultsDict = {};
                const resultsArray = [];

                // Compare dict containing teams and their matching emojis to dict containing voting results and their matching emojis
                for (const [key, val] of Object.entries(emojiDict)) {
                    for (const [key2, val2] of Object.entries(votingDict)) {
                        if (val === key2) { // If the emojis match, add to results array
                            resultsArray.push(`Team ${key}'s results: ${val2}`);
                            resultsDict[key] = val2;
                        }
                    }
                }

                const arr = toArray(getMaxVotes((resultsDict), 1)); // Get team(s) with the max amount of votes and save as winner
                const winner = arr.join(" and ");
                fs.writeFileSync("src/txt/jam-submissions/saveWinningTeam.txt", winner);

                const results_Embed = resultsFunc(resultsArray);
                const winner_Embed = winnerFunc(winner);
                message.reply({ embeds: [results_Embed] });
                message.reply({ embeds: [winner_Embed] })
            });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
