const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActivityType } = require("discord.js");
const { read } = require("../../misc/saveArray.js");
const { getMaxVotes, toArray } =  require("../../misc/voteFuncs.js");
const { voteEmbedFunc, resultsFunc, winnerFunc } =  require("../../misc/storedEmbed.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Starts the game jam voting process with all uploaded submissions - admin only"),
    async execute(interaction) {
        console.log("Vote started");

        let submissions = read("src/txt/submissions.txt");
        let dict = read("src/txt/submissionsDict.txt");
        let emojiDict = {};

        if (submissions.length != 0) {

            let emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];
            let emojiEntries = [];
            let chosenEmojis = []; // to get arrays of the emojis picked for filter & for users
            let resultsArray = [];

            // Get emojis
            for (const [key, val] of Object.entries(dict)) { // For each entry in dict
                const randEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Get a random emoji
                emojiDict[key] = randEmoji; // Create a new emojiDict to store its team with its voting emoji
                let entry = randEmoji + " Team " + key + "'s submission: " + val
                emojiEntries.push(entry); // Add the emoji to an array to inform users in message
                emojis.splice(randEmoji, 1); // Remove chosen emoji from emoji array
            }

            const submit_Embed = voteEmbedFunc(`${interaction.user.tag}`, emojiEntries); //Get embed to print

            const message = await interaction.reply({ content: "This vote will last for 15min\nPlease wait 5 seconds before voting to ensure your vote is counted", embeds: [submit_Embed], fetchReply: true });

            try {
                for (const [key, val] of Object.entries(emojiDict)) {
                    await message.react(val); // For every emoji in emojiDict, set emoji as reaction
                    chosenEmojis.push(val); // and add emoji to array to be used in filter
                }
                console.log(chosenEmojis);

            } catch (error) {
                console.error('One of the emojis failed to react:', error);
            }


            const filter = (reaction, user) => {
                return chosenEmojis.includes(reaction.emoji.name);
            };

            const collector = message.createReactionCollector({ filter, time: 900000 });

            let votingDict = {};
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                chosenEmojis.forEach(element => { // Find the element in chosenEmojis
                    if (element == reaction.emoji.name) { //If the emoji matches the emojis added by the bot
                        votingDict[element] = (votingDict[element] || 0) + 1; // if it exists in the dict already add 1 - if not, add it 
                    }
                });

            });


            collector.on('end', collected => {
                message.reply("Voting concluded")
                console.log(`Collected ${collected.size} items`);
                console.log(votingDict);

                resultsArray = [];
                resultsDict = {};

                for (const [key, val] of Object.entries(emojiDict)) { // ewww ugly
                    for (const [key2, val2] of Object.entries(votingDict)) { // it works though? /shrug
                        if (val == key2) { // If the emojis match, add to results array
                            resultsArray.push("Team " + key + " results: " + val2);
                            resultsDict[key] = val2;
                        }
                    }
                }

                let arr = toArray(getMaxVotes((resultsDict), 1));
                let winner = arr.join(" and ");
                write(winner, "src/txt/saveWinningTeam.txt");

                let results_Embed = resultsFunc(resultsArray);
                let winner_Embed = winnerFunc(winner);
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