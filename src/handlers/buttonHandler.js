const fs = require("fs");

module.exports = (client) => {
    client.buttonHandler = async () => {
        const buttonFiles = fs.readdirSync(`./src/buttons/`).filter((file) => file.endsWith("js"));

        for (const file of buttonFiles) {
            const button = require(`../buttons/${file}`);
            client.buttons.set(button.data.name, button);
        }
    };
};
