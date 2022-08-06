module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(client.user.tag + " bot is running!");
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
