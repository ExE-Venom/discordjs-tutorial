const { Client, Collection } = require('discord.js');
const fs = require('fs');
const env = process.env;
const config = require('./config.json');

const client = new Client(
        intents: ClientIntents,
        partials: ClientPartials,
        presence: {
            activities: [{
                name: 'VenomExE Tutorial',
                type: 0
            }],
            status: 'online'
        }
    }
)

client.commands = new Collection();
client.interactions = new Collection();

module.exports = client;
module.exports = config;
module.exports = env;

fs.readdirSync('./src/handlers').forEach((handler) => {
    console.log('[HANDLER] Loaded: ' + handler);
    require('./handlers/' + handler)(client, config);
});

require('./error/main')();

client.login(env.BOT_TOKEN);
