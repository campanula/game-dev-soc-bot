const fs = require("fs");

module.exports = (client) => {
    client.modalHandler = () => {
        const modalFiles = fs.readdirSync("./src/components/modals").filter((file) => file.endsWith("js"));

        for (const file of modalFiles) {
            const modal = require(`../../components/modals/${file}`);
            client.modals.set(modal.data.name, modal);
        }
    };
};
