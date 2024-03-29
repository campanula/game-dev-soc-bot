const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { read, write } = require("../../functions/misc-functions/saveToFile.js");

// Command to clear theme array
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-themes")
        .setDescription("Clears theme list - admin only")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /clear-themes command in #${interaction.channel.name}`);

        const theme = read("src/txt/jam-misc/themes.txt"); // Get current themelist as array

        if (theme.length === 0) {
            await interaction.reply({
                content: "The list is already empty!",
                ephemeral: true
            });

        } else {

            const newList = () => {

                theme.length = 0;
                write(theme, "src/txt/jam-misc/themes.txt");

                return theme.length;
            }

            const clear_Embed = new EmbedBuilder()
                .setDescription(`List cleared\nThere are now ${newList()} themes in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                });

            await interaction.reply({ embeds: [clear_Embed] });
        }
    },
};
