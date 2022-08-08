const chalk = require("chalk");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.log.botinfo(chalk.hex("#DEADED")(`${client.user.tag} is running!`));
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
