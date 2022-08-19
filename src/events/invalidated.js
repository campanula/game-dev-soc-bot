module.exports = {
    name: "invalidated",
    once: true,
    execute() {
        process.exit(1000)
    },
};
