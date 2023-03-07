const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.setDMPermission(false),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
        const { guild } = interaction;

		await interaction.reply(`Server name: ${guild.name}\nTotal members: ${guild.memberCount}`);
	},
};