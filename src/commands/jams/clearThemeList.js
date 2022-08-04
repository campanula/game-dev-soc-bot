const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

let theme = require("../../themelist.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clearlist")
        .setDescription("Clears theme list - admin only"), //command perms currently controlled in server settings not here
    defaultPermission: false,
    async execute(interaction) {
        if (theme.length === 0) {
            await interaction.reply({
                content: "The list is already empty!",
                ephemeral: true
            });
        } else {

            console.log("Clear list attempt");
            theme.length = 0;

            const clear_Embed = new MessageEmbed()
                .setDescription("List cleared\nThere are now " + theme.length + " themes in the list.")
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })


            await interaction.reply({ embeds: [clear_Embed] });
            console.log(theme);
        }
    }
}
