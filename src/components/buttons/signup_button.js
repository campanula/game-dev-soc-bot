const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const { read } = require("../../functions/misc-functions/saveToFile.js");

// Button to choose a theme
module.exports = {
    data: {
        name: "signup_button",
    },
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} clicked the signup_button button in #${interaction.channel.name}`);

        // Using files so that its easier to change the name of the jam without hardcoding it in everywhere each time
        const currentJam = read("src/txt/jam-misc/currentJam.txt");

        const modal = new ModalBuilder()
            .setCustomId('signup_modal')
            .setTitle(`GDS ${currentJam} Sign-Up Form`);

        const modalNameInput = new TextInputBuilder()
            .setCustomId('modalNameInput')
            .setLabel("The names of everyone in your team")
            .setStyle(TextInputStyle.Paragraph);

        const modalEmailInput = new TextInputBuilder()
            .setCustomId('modalEmailInput')
            .setLabel("The Essex emails of everyone in your team")
            .setStyle(TextInputStyle.Paragraph);

        const modalGithubInput = new TextInputBuilder()
            .setCustomId('modalGithubInput')
            .setLabel("The GitHub username of each team member")
            .setStyle(TextInputStyle.Paragraph);

        const modalExpInput = new TextInputBuilder()
            .setCustomId('modalExpInput')
            .setLabel("From 1-5, how experienced are you at gamedev?")
            .setStyle(TextInputStyle.Short);

        const nameActionRow = new ActionRowBuilder().addComponents(modalNameInput);
        const emailActionRow = new ActionRowBuilder().addComponents(modalEmailInput);
        const githubActionRow = new ActionRowBuilder().addComponents(modalGithubInput);
        const expActionRow = new ActionRowBuilder().addComponents(modalExpInput);

        modal.addComponents(nameActionRow, emailActionRow, githubActionRow, expActionRow);

        await interaction.showModal(modal);
    },
};
