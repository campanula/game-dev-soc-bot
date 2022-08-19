const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { read, write } = require("../../functions/misc-functions/saveToFile.js");

// Command to add themes to array
module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-theme")
        .setDescription("Add a game jam theme idea to the list!")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("The theme to add")
                .setRequired(true)),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /add-theme command in #${interaction.channel.name}`);

        const value = interaction.options.getString("input").toLowerCase(); // convert to lower case for comparison

        const theme = read("src/txt/jam-misc/themes.txt"); // Get current themelist as array

        if (!theme.includes(value)) {
            theme.push(value);

            write(theme, "src/txt/jam-misc/themes.txt");

            const add_Embed = new EmbedBuilder()
                .setDescription(`Theme ${value} added to list\nThere are now ${theme.length} themes in the list.`)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                });


            await interaction.reply({ embeds: [add_Embed] });
        } else {
            await interaction.reply({ content: "Theme already exists in list.", ephemeral: true });
        }
    },
};
