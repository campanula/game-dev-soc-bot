const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActivityType } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Starts the game jam voting process with all uploaded submissions - admin only"),
    async execute(interaction) {
        console.log("Vote started");

        let submissions = read("src/txt/submissions.txt");
        let dict = read("src/txt/submissionsDict.txt");
        let currentJam = read("src/txt/currentJam.txt");
        let emojiDict = {};

        if (submissions.length != 0) {

            let emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"];
            let emojiEntries = [];
            let chosenEmojis = []; // to get a list of the emojis picked

            for (const [key, val] of Object.entries(dict)) { // For each entry in dict
                const randEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Get a random emoji
                emojiDict[key] = randEmoji; // Create a new emojiDict to store its team with its voting emoji
                let entry = randEmoji + " Team " + key + "'s submission: " + val
                emojiEntries.push(entry); // Add the emoji to an array to inform users in message
                emojis.splice(randEmoji, 1); // Remove chosen emoji from emoji array
            }

            let subPrint = emojiEntries.join("\n")

            const submit_Embed = new MessageEmbed()
                .setTitle("All submissions")
                .setDescription(subPrint)
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

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
                return chosenEmojis.includes(reaction.emoji.name) && user.id === interaction.user.id;
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

                function maxValues(o, n) { // Get all max values from dictionary
                    // Get object values and sort descending
                    const values = Object.values(o).sort((a, b) => b - a);

                    // Check if more values exist than number required
                    if (values.length <= n) return o;

                    // Find nth maximum value
                    const maxN = values[n - 1];

                    // Filter object to return only key/value pairs where value >= maxN
                    return Object.entries(o)
                        .reduce((o, [k, v]) => v >= maxN ? { ...o, [k]: v } : o, {});
                }

                let arr = [];
                for (const [key, val] of Object.entries(maxValues((resultsDict), 3))) {
                    arr.push(key);
                }

                let winner = arr.join(" and ");
                write(winner, "src/txt/saveVote.txt");
                let resultsPrint = resultsArray.join("\n") + "\nThe winner is team " + winner;

                const results_Embed = new MessageEmbed()
                    .setTitle("Results")
                    .setDescription(resultsPrint)
                    .setColor("BLURPLE")
                    .setTimestamp()

                message.reply({ embeds: [results_Embed] });

                const winner_Embed = new MessageEmbed()
                    .setTitle("✨ Game Jam Winner - " + currentJam + " ✨")
                    .setDescription("The winner of this game jam is team 🎈 " + winner + "!! 🎈\nCongrats on your win!")
                    .setColor("BLURPLE")
                    .setTimestamp()

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
