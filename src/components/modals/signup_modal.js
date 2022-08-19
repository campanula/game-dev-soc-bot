const { read, write } = require("../../functions/misc-functions/saveToFile.js");

module.exports = {
    data: {
        name: "signup_modal",
    },
    async execute(interaction, client) {
        client.log.interinfo(
            `${interaction.user.tag} submitted the sign-up form in #${interaction.channel.name}`
        );

        // Get the data entered by the user
        const modalName = interaction.fields.getTextInputValue("modalNameInput");
        const modalEmail = interaction.fields.getTextInputValue("modalEmailInput");
        const modalGithub = interaction.fields.getTextInputValue("modalGithubInput");
        const modalExp = interaction.fields.getTextInputValue("modalExpInput");

        client.log.interinfo(
            `Form input: ${modalName}, ${modalEmail}, ${modalGithub}, ${modalExp}`
        );

        // Create object with questions linked to answers
        const saveCurrentInput = () => {
            const signup_modal_dict = {};

            const Questions = ["Names", "Emails", "Githubs", "Exp"];

            const Answers = [modalName, modalEmail, modalGithub, modalExp];

            for (let i = 0; i < Questions.length; i++) {
                signup_modal_dict[Questions[i]] = Answers[i];
            }

            return signup_modal_dict;
        };

        // add new Q/A object to array
        const addInputToArray = () => {
            const signup_modal_array = read("src/txt/jam-misc/signupForm.txt");
            signup_modal_array.push(saveCurrentInput());

            return signup_modal_array;
        };

        write(addInputToArray(), "src/txt/jam-misc/signupForm.txt");

        await interaction.reply({
            content:
                "Your submission was received successfully!\n Make sure to pick up the game jammer role in #roles so you can see the relevant channels in our discord!",
            ephemeral: true,
        });
    },
};
