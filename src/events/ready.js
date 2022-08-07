module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is running!`);
        client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "you",
                    type: "WATCHING",
                },
            ],
        });
    },
};
