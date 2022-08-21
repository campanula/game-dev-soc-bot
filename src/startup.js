const { logger, processLogger } = require("./logger.js");

const child_process = require("child_process");
processLogger.process("[ PARENT ] => process is running.");

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const start = (nodefile, reboot) => {
    if (typeof nodefile !== "string") {
        return processLogger.process("Give a file name to run");
    }

    processLogger.process("[ PARENT ] => Spawning Child process.");
    let child = null;
    if (reboot) {
        child = child_process.spawn("node", [nodefile, `${reboot}`]);
    } else {
        child = child_process.spawn("node", [nodefile]);
    }

    child.stdout.on("data", (data) => {
        logger.process(data.toString());
    });

    child.stderr.on("data", (data) => {
        logger.process(data.toString());
    });

    child.on("exit", async (code) => {
        if (code === 1000) return processLogger.process(`[ CHILD ] = > Stopped with code: 1000, rebooting prevented`);
        processLogger.process(`[ PARENT ] => Child process exited with code ${code}\n`);

        processLogger.process("Rebooting in 3 seconds");
        await sleep(994);
        processLogger.process("Rebooting in 2 seconds");
        await sleep(994);
        processLogger.process("Rebooting in 1 second");
        await sleep(994);
        processLogger.process("Rebooting in 0 seconds");
        start(nodefile, code);
        return processLogger.process("Rebooting...");
    });
    return processLogger.process("[ PARENT ] => Startup process complete.");
}

start(process.argv[2]);
