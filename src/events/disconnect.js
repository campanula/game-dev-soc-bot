const chalk = require("chalk");

module.exports = {
    name: "disconnect",
    once: true,
    execute(client) {
        client.log.botinfo(chalk.hex("#DEADED")("The websocket connection has closed"));

    },
};
