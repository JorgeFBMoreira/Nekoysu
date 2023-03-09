const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
        
	/**
	 * 
	 * @param { ChatInputCommandInteraction } interaction 
	 */
	async execute(interaction) {
		await interaction.reply(`🏓 API Latency: \`${Math.round(interaction.client.ws.ping)}ms\`.`);
	},
};