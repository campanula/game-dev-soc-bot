const {read, write} = require("../saveArray.js");

let theme = require("../themelist.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        theme = read("src/txt/themes.txt");
        console.log(theme);
        console.log(theme.length);

        console.log("Bot is running!");
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
