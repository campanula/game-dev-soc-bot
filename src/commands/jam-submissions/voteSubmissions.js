const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
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
                .setDescription(subPrint.toString())
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            const message = await interaction.reply({ embeds: [submit_Embed], fetchReply: true });

            try {
                for (const [key, val] of Object.entries(emojiDict)) { // For every emoji in emojiDict, set emoji as reaction
                    await message.react(val);
                }

            } catch (error) {
                console.error('One of the emojis failed to react:', error);
            }

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
