module.exports = {
    name: "disconnect",
    once: true,
    execute(client) {
        client.log.botinfo("The websocket connection has closed");

    },
};
