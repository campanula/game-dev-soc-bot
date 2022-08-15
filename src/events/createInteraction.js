const { InteractionType } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        //client.log.botinfo(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                client.log.error(error);
                await interaction.reply({
                    content: "There was an error executing the command",
                    ephemeral: true
                });
                throw error;
            }

        } else if (interaction.isSelectMenu()) {
            const menu = client.menus.get(interaction.customId);

            if (!menu) return;

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                client.log.error(error);
                await interaction.reply({
                    content: "There was an error executing the menu",
                    ephemeral: true
                });
                throw error;
            }
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);

            if (!button) return;

            try {
                await button.execute(interaction, client);
            } catch (error) {
                client.log.error(error);
                await interaction.reply({
                    content: "There was an error executing the button",
                    ephemeral: true
                });
                throw error;
            }

        } else if (interaction.type === InteractionType.ModalSubmit) {
            const modal = client.modals.get(interaction.customId);

            if (!modal) return;

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                client.log.error(error);
                await interaction.reply({
                    content: "There was an error executing the modal",
                    ephemeral: true
                });
                throw error;
            }
        }

    }
}
