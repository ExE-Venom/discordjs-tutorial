const client = require('../../index.js');

client.once('ready', async () => {
    console.log('> Logged in as ' + client.user.username);
});
