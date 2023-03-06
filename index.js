const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const env = process.env;
const config = require('./config.json');

const client = new Client(
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
        name: 'VenomExE Tutorial',
        type: 0
    }],
    status: 'online'
  }
)

client.commands = new Collection();
client.interactions = new Collection();

module.exports = client;
module.exports = config;
module.exports = env;

fs.readdirSync('./src/handlers').forEach((file) => {
    console.log('[HANDLER] Loaded: ' + file);
    require('./handlers/' + file)(client, config);
});

client.login(env.BOT_TOKEN);
