const child_process = require("child_process");
console.log("[ PARENT ] => process is running.");
start(process.argv[2]);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function start(nodefile, reboot) {
    if (typeof nodefile != "string") {
        return console.log("Give a file name to run");
    }

    console.log("[ PARENT ] => Spawning Child process.");
    let child;
    if (reboot) child = child_process.spawn("node", [nodefile, `${reboot}`]);
    else child = child_process.spawn("node", [nodefile]);

    child.stdout.on("data", function (data) {
        console.log(data.toString());
    });

    child.stderr.on("data", function (data) {
        console.log(data.toString());
    });

    child.on("exit", async function (code) {
        if (code == 1000) return console.log(`[ CHILD ] = > Stopped with code: 1000, rebooting prevented`);
        console.log("[ PARENT ] => Child process exited with code" + " " + code + "\n");
        delete proc;

        console.log("Rebooting in 3 seconds");
        await sleep(994);
        console.log("Rebooting in 2 seconds");
        await sleep(994);
        console.log("Rebooting in 1 second");
        await sleep(994);
        console.log("Rebooting in 0 seconds");
        start(nodefile, code);
        console.log("Rebooting...");
    });
}
