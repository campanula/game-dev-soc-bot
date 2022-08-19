const { logger, processLogger } = require("./logger.js");

const child_process = require("child_process");
processLogger.process("[ PARENT ] => process is running.");

start(process.argv[2]);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function start(nodefile, reboot) {
    if (typeof nodefile != "string") {
        return processLogger.process("Give a file name to run");
    }

    processLogger.process("[ PARENT ] => Spawning Child process.");
    let child;
    if (reboot) child = child_process.spawn("node", [nodefile, `${reboot}`]);
    else child = child_process.spawn("node", [nodefile]);

    child.stdout.on("data", function (data) {
        logger.process(data.toString());
    });

    child.stderr.on("data", function (data) {
        logger.process(data.toString());
    });

    child.on("exit", async function (code) {
        if (code == 1000) return processLogger.process(`[ CHILD ] = > Stopped with code: 1000, rebooting prevented`);
        processLogger.process("[ PARENT ] => Child process exited with code" + " " + code + "\n");
        delete proc;

        processLogger.process("Rebooting in 3 seconds");
        await sleep(994);
        processLogger.process("Rebooting in 2 seconds");
        await sleep(994);
        processLogger.process("Rebooting in 1 second");
        await sleep(994);
        processLogger.process("Rebooting in 0 seconds");
        start(nodefile, code);
        processLogger.process("Rebooting...");
    });
}
