module.exports = {
    name: "error",
    once: true,
    execute(client) {
        this.log.error("The client's websocket has encountered a connection error");

    },
};
