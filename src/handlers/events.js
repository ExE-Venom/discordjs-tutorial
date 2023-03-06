const fs = require("fs");
const colors = require("colors");

module.exports = (client) => {
  
  fs.readdirSync('./src/events/').forEach(dir => {
		const events = fs.readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));
		for (let file of events) {
      
			let pull = require(`../events/${dir}/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
			} else {
				console.log(`[HANDLER - EVENTS] Couldn't load the file ${file}. missing name or aliases.`)
				continue;
			}
      
		}
	});
}
