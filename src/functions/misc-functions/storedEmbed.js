const { EmbedBuilder } = require("discord.js");
const { read } = require("./saveToFile.js");

const currentJam = read("src/txt/jam-misc/currentJam.txt");

const resultsFunc = (resultsArray) => {

    return new EmbedBuilder()
        .setTitle("Results")
        .setDescription(resultsArray.join("\n"))
        .setColor("#5865F2")
        .setTimestamp();
}

const winnerFunc = (winner) => {

    return new EmbedBuilder()
        .setTitle(`✨ Game Jam Winner - ${currentJam} ✨`)
        .setDescription(`The winner of this game jam is 🎈 team ${winner}!! 🎈\nCongrats on your win!`)
        .setColor("#5865F2")
        .setTimestamp();
}

const voteEmbedFunc = (inter, emojiEntries) => {
    return new EmbedBuilder()
        .setTitle("All submissions")
        .setDescription(emojiEntries.join("\n"))
        .setColor("#5865F2")
        .setTimestamp()
        .setFooter({
            text: `Triggered by ${inter}`
        });

}

module.exports = { voteEmbedFunc, resultsFunc, winnerFunc };
