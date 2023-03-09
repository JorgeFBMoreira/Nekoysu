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
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		if(command.developer && interaction.user.id !== "1020433335803183165")
        return interaction.reply({
            content: "This command is only available to the developer.",
            ephemeral: true
        });



        const subCommand = interaction.options.getSubcommand(false);
		
		try {
			if(subCommand) {
				const subCommandFile = interaction.client.subCommands.get(`${interaction.commandName}.${subCommand}`);
				if(!subCommandFile) return console.error(`No command matching ${interaction.commandName} was found.`);

				await subCommandFile.execute(interaction)
			}
			
			else await command.execute(interaction);
		} catch (error) {
			if(!error) return;
			
			console.error(`\nError executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
