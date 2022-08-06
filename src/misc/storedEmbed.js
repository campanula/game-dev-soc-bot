const { MessageEmbed } = require("discord.js");

let results_Embed, winner_Embed;
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



module.exports = { resultsFunc, winnerFunc }