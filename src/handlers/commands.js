const fs = require("fs");

module.exports = (client, config) => {

  fs.readdirSync('./src/commands/normal/').forEach(dir => {
    const commands = fs.readdirSync(`./src/commands/normal/${dir}`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/normal/${dir}/${file}`);
      if (pull.config.name) {
        client.commands.set(pull.config.name, pull);
      } else {
        console.log(`[HANDLER] Couldn't load the file ${file}, missing name.`)
        continue;
      };

    };
  });
};
