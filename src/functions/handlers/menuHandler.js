const fs = require("fs");

module.exports = (client) => {
    client.menuHandler = async () => {
        const menuFiles = fs.readdirSync("./src/components/menus").filter((file) => file.endsWith("js"));

        for (const file of menuFiles) {
            const menu = require(`../../components/menus/${file}`);
            client.menus.set(menu.data.name, menu);
        }
    };
};
