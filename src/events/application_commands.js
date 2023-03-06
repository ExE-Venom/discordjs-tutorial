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
            if (command.owner_only && typeof command.owner_only === 'boolean') {
                if (config.users.owner !== interaction.user.id) {
                    return interaction.reply({
                        content: `\`❌\` Sorry but this command is restricted for the bot owner only!`,
                        ephemeral: true
                    });
                };
            };

            if (command.role_perms) {
                if (Array.isArray(command.role_perms)) {
                    if (command.role_perms?.length > 0) {
                        let boolean = false;

                        await command.role_perms.forEach((r) => {
                            const role = interaction.guild.roles.cache.get(r);

                            if (!role) return;

                            if (!interaction.member.roles) boolean = false;
                            if (interaction.member.roles.cache.some((r1) => r1.id === role.id)) boolean = true;
                        });

                        if (boolean === false) return interaction.reply({
                            content: `\`❌\` Sorry but you are not allowed to use this command!`,
                            ephemeral: true
                        });
                    };
                } else if (typeof command.role_perms === 'string') {
                    const role = interaction.guild.roles.cache.get(command.role_perms);

                    if (role) {
                        if (!interaction.member.roles.cache.has(role)) return interaction.reply({
                            content: `\`❌\` Sorry but you are not allowed to use this command!`,
                            ephemeral: true
                        });
                    };
                };
            };

            command.run(client, interaction, config);

        } catch (err) {
            console.log(`[WARN] Failed to run the command \'${interaction.commandName}\'.`);
            console.log(err);
        } finally {
            console.log(`[INFO] ${interaction.user.username} has used the command \'${interaction.commandName}\'.`);
        };
    } else return;
});
