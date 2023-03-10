const { Events, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	name: Events.InteractionCreate,

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		const botOwner = process.env.OWNER_ID;

		if (!command) {
			return console.error(`No command matching ${interaction.commandName} was found.`);
		}
		else if(command.developer && interaction.user.id !== botOwner) return interaction.reply({
            content: "This command is only available to the developer.",
            ephemeral: true
        });



        const subCommand = interaction.options.getSubcommand(false);
		
		try {
			if(subCommand) {
				const subCommandFile = interaction.client.subCommands.get(`${interaction.commandName}.${subCommand}`);
				if(!subCommandFile) throw console.error(`No command matching ${interaction.commandName} was found.`);

				await subCommandFile.execute(interaction)
			}
			
			else await command.execute(interaction);
		} catch (error) {
			if(!error) return;

			const channelID = process.env.PRIVATE_LOGS;
			const channel = interaction.client.channels.cache.get(channelID);
			
			if(error.response) console.error(`\n\nSomething went wrong executing ${interaction.commandName}:\n`, error);
			console.log('\n\n', error)
			await channel.send({
				content: `Error Message: ${error}`,
			});
		}
	},
};
