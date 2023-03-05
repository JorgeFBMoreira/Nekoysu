const { loadCommands } = require('../../Handlers/commandHandler');
const { Events } = require('discord.js');



module.exports = {
	name: Events.ClientReady,
	once: true,
    
	execute(client) {
		loadCommands(client);

		console.log(`Ready! Logged in as ${client.user.tag}.`);
	},
};
