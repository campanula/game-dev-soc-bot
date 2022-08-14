const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { read, write } = require("../../misc/saveArray.js");

// Command to remove theme from array
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-theme")
        .setDescription("Remove a theme from the list - admin only")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("The theme to remove")
                .setRequired(true)),
    defaultPermission: false,
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /remove-theme command in #${interaction.channel.name}`);

        const theme = read("src/txt/themes.txt"); // Get current themelist as array
        const value = interaction.options.getString("input").toLowerCase();

        const index = theme.indexOf(value);
        if (index > -1) { // splice array when theme is found
            theme.splice(index, 1); // Remove theme from array

            write(theme, "src/txt/themes.txt");

            const delete_Embed = new EmbedBuilder()
                .setDescription(`Theme ${value} deleted from list\nThere are now ${theme.length} themes in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })
            await interaction.reply({ embeds: [delete_Embed] });
        } else {
            await interaction.reply({ content: "Could not remove theme", ephemeral: true });
        }

    }
}
