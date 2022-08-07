const { MessageEmbed } = require("discord.js");
const { readTxt } = require("./saveArray.js");

const currentJam = readTxt("src/txt/currentJam.txt");

const resultsFunc = (resultsArray) => {

    return new MessageEmbed()
        .setTitle("Results")
        .setDescription(resultsArray.join("\n"))
        .setColor("BLURPLE")
        .setTimestamp();
}

const winnerFunc = (winner) => {

    return new MessageEmbed()
        .setTitle(`✨ Game Jam Winner - ${currentJam} ✨`)
        .setDescription(`The winner of this game jam is 🎈 team ${winner}!! 🎈\nCongrats on your win!`)
        .setColor("BLURPLE")
        .setTimestamp();
}

const voteEmbedFunc = (inter, emojiEntries) => {
    return new MessageEmbed()
        .setTitle("All submissions")
        .setDescription(emojiEntries.join("\n"))
        .setColor("BLURPLE")
        .setTimestamp()
        .setFooter({
            text: `Triggered by ${inter}`
        });

}


module.exports = { voteEmbedFunc, resultsFunc, winnerFunc }