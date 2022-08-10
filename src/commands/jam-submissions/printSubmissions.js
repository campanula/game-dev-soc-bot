const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { read } = require("../../misc/saveArray.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("submissions")
        .setDescription("Prints all jam submissions"),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /submissions command in #${interaction.channel.name}`);

        const submissions = read("src/txt/submissions.txt"); // Read submissions from file then print

        if (submissions.length !== 0) {

            const subPrint = submissions.join("\n")

            const submit_Embed = new EmbedBuilder()
                .setTitle("All submissions")
                .setDescription(subPrint)
                .setColor("#5865F2")
                .setTimestamp()
                .setFooter({
                    text: `Triggered by ${interaction.user.tag}`
                })

            await interaction.reply({ embeds: [submit_Embed] });

        } else {
            await interaction.reply({
                content: "List is empty",
                ephemeral: true
            });
        }
    },
};
