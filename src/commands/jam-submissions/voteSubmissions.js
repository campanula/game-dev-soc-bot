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

            const message = await interaction.reply({ embeds: [submit_Embed], fetchReply: true });

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

            const collector = message.createReactionCollector({ filter, time: 15000, max: 2, maxEmojis: 10, maxUsers: 10 });

            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                if (chosenEmojis.includes(reaction.emoji.name)) {
                    message.reply('Reaction detected');

                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
