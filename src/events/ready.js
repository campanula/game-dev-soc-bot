const { channelId } = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Bot is running!');
        client.user.setPresence({
            status: 'online',
            activities: [{
                name: 'you',
                type: 'WATCHING'
            }]
        });
        const messageChannel = client.channels.cache.get(channelId);
        //messageChannel.send(client.user.tag + ' starting...');
    },
};
