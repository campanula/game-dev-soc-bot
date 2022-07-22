const mongoose = require('mongoose');
const fs = require('fs');

const dbEvents = fs.readdirSync('./src/events/dbEvents').filter(file => file.endsWith('.js'));

module.exports = (client) => {
    client.dbHandler = async () => {

        for (file of dbEvents){
            const event = require(`../events/dbEvents/${file}`);
            if (event.once) {
                mongoose.connection.once(event.name, (...args) => event.execute(...args));
            } else {
                mongoose.connection.on(event.name, (...args) => event.execute(...args));
            }
        }

        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.DB_TOKEN);
    }
}
