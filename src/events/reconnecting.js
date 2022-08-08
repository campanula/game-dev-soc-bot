module.exports = {
    name: "reconnecting",
    once: true,
    execute(client) {
        client.log.botinfo("Client is attempting to reconnect to the websocket");

    },
};
