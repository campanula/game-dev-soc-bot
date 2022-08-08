module.exports = {
    name: "error",
    once: true,
    execute(client) {
        client.log.error("The client's websocket has encountered a connection error");

    },
};
