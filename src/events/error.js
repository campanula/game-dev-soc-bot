const chalk = require("chalk");

module.exports = {
    name: "error",
    once: true,
    execute(client) {
        client.log.error(chalk.red.bold("The client's websocket has encountered a connection error"));

    },
};
