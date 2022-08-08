const chalk = require("chalk");

module.exports = {
    name: "reconnecting",
    once: true,
    execute(client) {
        client.log.botinfo(chalk.hex("#DEADED")("Client is attempting to reconnect to the websocket"));
        
    },
};
