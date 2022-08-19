const fs = require("fs");

module.exports = (client) => {
    client.buttonHandler = () => {
        const buttonFiles = fs.readdirSync(`./src/components/buttons/`).filter((file) => file.endsWith("js"));

        for (const file of buttonFiles) {
            const button = require(`../../components/buttons/${file}`);
            client.buttons.set(button.data.name, button);
        }
    };
};
