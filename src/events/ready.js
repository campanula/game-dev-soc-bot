const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.log.botinfo(`${client.user.tag} is running!`);

        const botStatus = [
            {
                status: "online",
                name: "you",
                type: ActivityType.Watching,
            },
            {
                status: "online",
                name: "Join Essex GDS!",
                type: ActivityType.Playing,
            },
            {
                status: "online",
                name: "/help for commands",
                type: ActivityType.Listening,
            }
        ];

        client.choosePresence = async () => {
            const choice = Math.floor(Math.random() * botStatus.length);
            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: botStatus[choice].name,
                            type: botStatus[choice].type,
                        },
                    ],
                    status: botStatus[choice].status
                });
            } catch (error) {
                client.error(error);
                throw error;
            }

            return choice;
        }
        await client.choosePresence();
        setInterval(client.choosePresence, 1000 * 60 * 15);
    },
};
