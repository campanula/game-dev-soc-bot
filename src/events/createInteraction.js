module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isCommand()){
            const command = client.commands.get(interaction.commandName);

            if (!command) return;
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error executing the command',
                    ephemeral: true
                });
            }

        } else if (interaction.isSelectMenu()){
            const menu = client.menus.get(interaction.customId);

            if (!menu) return;

            try {
                await menu.execute(interaction, client);
            } catch(error){
                console.error(error);
                await interaction.reply({
                    content: 'There was an error executing the menu',
                    ephemeral: true
                });
            }
        }

    }
}
