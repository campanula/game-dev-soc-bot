const { MessageEmbed } = require("discord.js");

let theme = require("../themelist.js");
const {read} = require("../saveArray.js");

module.exports = {
    data: {
        name: "refresh_choice",
    },
    async execute(interaction) {
        theme = read("src/txt/themes.txt");

        if (theme.length != 0) {
            const random = Math.floor(Math.random() * theme.length);
            console.log(theme[random]);

            const choice_Embed = new MessageEmbed()
                .setDescription("I have chosen the theme: " + theme[random])
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`,
                });

            await interaction.reply({ embeds: [choice_Embed] });
        } else {
            await interaction.reply("List is empty");
        }
    },
};
