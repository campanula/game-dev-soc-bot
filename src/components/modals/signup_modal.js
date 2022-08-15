module.exports = {
    data: {
        name: "signup_modal",
    },
    async execute(interaction, client) {

        client.log.interinfo(`${interaction.user.tag} submitted the sign-up form in #${interaction.channel.name}`);

        // Get the data entered by the user
        const modalName = interaction.fields.getTextInputValue('modalNameInput');
        const modalEmail = interaction.fields.getTextInputValue('modalEmailInput');
        const modalGithub = interaction.fields.getTextInputValue('modalGithubInput');
        const modalExp = interaction.fields.getTextInputValue('modalExpInput');

        console.log({ modalName, modalEmail, modalGithub, modalExp });

        await interaction.reply({ content: 'Your submission was received successfully!\n Make sure to pick up the game jammer role in #roles so you can see the relevant channels in our discord!', ephemeral: true });

    }
};
