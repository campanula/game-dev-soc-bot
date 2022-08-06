const { MessageEmbed } = require("discord.js");

let results_Embed, winner_Embed, submit_Embed;
const currentJam = read("src/txt/currentJam.txt");

resultsFunc = (resultsArray) => {

    return results_Embed = new MessageEmbed()
        .setTitle("Results")
        .setDescription(resultsArray.join("\n"))
        .setColor("BLURPLE")
        .setTimestamp()
}

winnerFunc = (winner) => {

    return winner_Embed = new MessageEmbed()
        .setTitle("✨ Game Jam Winner - " + currentJam + " ✨")
        .setDescription("The winner of this game jam is 🎈 team " + winner + "!! 🎈\nCongrats on your win!")
        .setColor("BLURPLE")
        .setTimestamp()
}

voteEmbedFunc = (inter, emojiEntries) => {
    return submit_Embed = new MessageEmbed()
        .setTitle("All submissions")
        .setDescription(emojiEntries.join("\n"))
        .setColor("BLURPLE")
        .setTimestamp()
        .setFooter({
            text: 'Triggered by' + inter
        })

}


module.exports = { voteEmbedFunc, resultsFunc, winnerFunc }