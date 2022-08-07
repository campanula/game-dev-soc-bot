const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("congrats")
        .setDescription("Congratulate a user!")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The user")),

    async execute(interaction) {
        const target = interaction.options.getUser("target");

        if (!target) {
            await interaction.reply({
                content: "You need to choose a target!",
                ephemeral: true
            });
        } else {
            const userEmbed = new MessageEmbed()
                .setTitle("Congrats!")
                .setImage("https://cdn.discordapp.com/attachments/1000126955024285736/1004531350394634380/clapping-applause.gif")
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({
                content: `<@${interaction.user.id}> says well done to <@${target.id}>!`,
                embeds: [userEmbed]
            });
        }
    }
}
