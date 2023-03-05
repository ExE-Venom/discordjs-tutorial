const client = require('../../index.js');
const config = require('../../config.json');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isModalSubmit()) {
        const interactionModuleCustomId = await client.interactions.get(interaction.customId);

        if (!interactionModuleCustomId) return;

        interactionModuleCustomId.run(client, interaction);
    } else return;
});
