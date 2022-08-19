const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "select_help",
    },
    async execute(interaction, client) {
        switch (`${interaction.values}`) {
            case "info_help": {
                client.log.interinfo(`${interaction.user.tag} clicked info_help on the help menu in #${interaction.channel.name}`);

                const info_helpEmbed = new EmbedBuilder()
                    .setTitle("All Info Commands")
                    .addFields(
                        { name: "/help", value: "Get a list of all commands" },
                        { name: "/events", value: "Get info on current society events" },
                        { name: "/ping", value: "Get info about the bot's current uptime and latency" },
                        { name: "/info", value: "Get info on either the bot, the society, or a user" }
                    )
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`,
                    });

                await interaction.reply({
                    embeds: [info_helpEmbed],
                    ephemeral: true
                });
                break;
            }

            case "jam_help": {
                client.log.interinfo(`${interaction.user.tag} clicked jam_help on the help menu in #${interaction.channel.name}`);

                const jam_helpEmbed = new EmbedBuilder()
                    .setTitle("All Jam Commands")
                    .addFields(
                        { name: "Themes", value: "-----" },
                        { name: "/add-theme", value: "Add a jam theme to the list" },
                        { name: "/choose-theme", value: "Choose a jam theme from the list" },
                        { name: "/clear-themes", value: "Clear the list (admin only)" },
                        { name: "/themes", value: "Print the jam list" },
                        { name: "/remove-theme", value: "Remove a jam theme from the list (admin only)" },
                        { name: "\u200b", value: "\u200b" },
                        { name: "Submissions", value: "-----" },
                        {
                            name: "/submit",
                            value: "Submit your game jam entry to the list. \nPlease make sure your entry is in https:// format and from the sites github.com, itch.io, or gamejolt.com"
                        },
                        { name: "/submissions", value: "Prints a list of all the current submissions" },
                        { name: "/remove-submission", value: "Removes a submission from the list (admin only)" },
                        { name: "/clear-submissions", value: "Clears a submission from the list (admin only)" },
                        { name: "/vote", value: "Starts voting for all current submissions (admin only)" },
                        { name: "/winner", value: "Prints the winner of the last game jam vote (admin only)" },
                    )
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`,
                    });

                await interaction.reply({
                    embeds: [jam_helpEmbed],
                    ephemeral: true
                });
                break;
            }

            case "fun_help": {
                client.log.interinfo(`${interaction.user.tag} clicked fun_help on the help menu in #${interaction.channel.name}`);

                const fun_helpEmbed = new EmbedBuilder()
                    .setTitle("All Fun Commands")
                    .addFields(
                        { name: "/avatar", value: "Get a user's avatar" },
                        { name: "/congrats", value: "Congratulate a user!" },
                        {
                            name: "/translate",
                            value: "Translate a piece of text. \nTo use, use the command with the text, the lang to be translated from, and the lang to be translated to. \ne.g., /translate text: Game origin: English target: Polish"
                        },
                    )
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`,
                    });

                await interaction.reply({
                    embeds: [fun_helpEmbed],
                    ephemeral: true
                });
                break;
            }

            default: {
                await interaction.reply({
                    content: "Choose a valid option",
                    ephemeral: true,
                });
                break;
            }
        }
    },
};
