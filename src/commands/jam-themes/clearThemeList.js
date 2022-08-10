const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-themes")
        .setDescription("Clears theme list - admin only"), //command perms currently controlled in server settings not here
    defaultPermission: false,
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /clear-themes command in #${interaction.channel.name}`);

        const theme = read("src/txt/themes.txt");
        if (theme.length === 0) {
            await interaction.reply({
                content: "The list is already empty!",
                ephemeral: true
            });
        } else {
            theme.length = 0;
            write(theme, "src/txt/themes.txt");

            const clear_Embed = new EmbedBuilder()
                .setDescription(`List cleared\nThere are now ${theme.length} themes in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })


            await interaction.reply({ embeds: [clear_Embed] });
        }
    }
}
