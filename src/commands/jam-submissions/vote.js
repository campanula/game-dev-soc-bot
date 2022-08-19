const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");
const { voteEmbedFunc, resultsFunc, winnerFunc } = require("../../functions/misc-functions/storedEmbed.js");
const fs = require("fs");

// Command for reaction-based voting on submissions
module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Starts the game jam voting process with all uploaded submissions - admin only")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /vote command in #${interaction.channel.name}`);

        const submissionsDict = read("src/txt/jam-submissions/submissionsDict.txt");

        if (Object.keys(submissionsDict).length !== 0) {

            const setUpDictionary = (submissionsDict) => {

                const votingDict = {};
                const emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];

                // For every submission in the submissionsDict object
                for (const [team, submission] of Object.entries(submissionsDict)) {

                    let randEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    emojis.splice(emojis.indexOf(randEmoji), 1); // Remove chosen emoji from emoji array

                    // Create an object with team as key containing all needed variables
                    votingDict[team] = {
                        "emoji": randEmoji,
                        "team": team,
                        "submission": submission,
                        "vote": 0
                    };
                }
                return votingDict;
            }

            let votingDict = setUpDictionary(submissionsDict);

            // Create array to add to message
            const createStartMessage = (votingDict) => {
                const messageArray = [];
                for (const key of Object.keys(votingDict)) {
                    const entry = `${votingDict[key].emoji} Team ${votingDict[key].team}'s submission: ${votingDict[key].submission}`
                    messageArray.push(entry);
                }

                return messageArray;
            }

            const submit_Embed = voteEmbedFunc(`${interaction.user.tag}`, createStartMessage(votingDict));

            const message = await interaction.reply({ content: "This vote will last for 15min\nPlease wait 5 seconds before voting to ensure your vote is counted", embeds: [submit_Embed], fetchReply: true });

            // Add emojis to message and make filter for collector
            const emojiFilter = [];

            try {
                for (const key of Object.keys(votingDict)) {
                    const val = votingDict[key].emoji;
                    await message.react(val); // For every emoji in votingDict, set emoji as reaction
                    emojiFilter.push(val); // and add emoji to array to be used in filter
                }
            } catch (error) {
                client.log.error("One of the emojis failed to react:", error);
                throw error;
            }

            // Collector to get reactions
            const filter = (reaction, user) => {
                return emojiFilter.includes(reaction.emoji.name) && !user.bot;
            };

            const collector = message.createReactionCollector({ filter, time: 900000 });

            const addVote = (votingDict, element) => {
                for (const key of Object.keys(votingDict)) {
                    if (votingDict[key].emoji === element) {
                        votingDict[key].vote++;
                    }
                }
                return votingDict
            }

            collector.on("collect", (reaction, user) => {
                client.log.interinfo(`Collected ${reaction.emoji.name} from ${user.tag}`);

                emojiFilter.forEach(element => {
                    if (element === reaction.emoji.name) { // If the emoji matches the emojis added by the bot
                        addVote(votingDict, element); // Increment the vote value by 1;
                    }
                });

            });


            collector.on("end", collected => {
                message.reply("Voting concluded")
                client.log.interinfo(`Vote ended. Collected ${collected.size} items.`);

                // Create array to add to message
                const createVoteMessage = (votingDict) => {
                    const resultsArray = [];
                    for (const key of Object.keys(votingDict)) {
                        resultsArray.push(`Team ${votingDict[key].team}'s results: ${votingDict[key].vote}`);
                    }

                    return resultsArray;
                }

                // Get the teams with the max votes and assign them as the winners
                const getWinner = (votingDict) => {
                    const resultsDict = {};
                    const currentWinners = [];
                    let tmp = 0;
                    let winner = null;

                    for (const key of Object.keys(votingDict)) {
                        resultsDict[votingDict[key].team] = votingDict[key].vote;
                    }

                    for (const key in resultsDict) {
                        if (resultsDict[key] > tmp) {
                            tmp = resultsDict[key];
                            currentWinners.length = 0;
                            currentWinners.push(key);

                        } else if (resultsDict[key] === tmp && resultsDict[key] !== 0) {
                            currentWinners.push(key);
                        }
                    }

                    winner = currentWinners.join(" and ");

                    return winner;
                }

                const winner = getWinner(votingDict);

                fs.writeFileSync("src/txt/jam-submissions/saveWinningTeam.txt", winner);

                if (winner) {
                    const results_Embed = resultsFunc(createVoteMessage(votingDict));
                    const winner_Embed = winnerFunc(getWinner(votingDict));
                    message.reply({ embeds: [results_Embed] });
                    message.reply({ embeds: [winner_Embed] })
                } else {
                    message.reply("No votes have been counted - there is no winner.");
                }
            });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};

