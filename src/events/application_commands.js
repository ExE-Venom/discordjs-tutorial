const client = require('../../index.js');
const config = require('../../config.json');
const ms = require('ms');
const { EmbedBuilder } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        const command = await client.commands.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: `\`❌\` Invalid command, please try again later.`,
            ephemeral: true
        });

        try {
            command.run(client, interaction, config);
        } catch (err) {
            console.log(`[WARN] Failed to run the command \'${interaction.commandName}\'.`);
            console.log(err);
        } finally {
            console.log(`[INFO] ${interaction.user.username} has used the command \'${interaction.commandName}\'.`);
        };
    } else return;
});
