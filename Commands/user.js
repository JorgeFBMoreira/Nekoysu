const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),

	async execute(interaction) {
        const { user, member } = interaction;
        
		await interaction.reply(`This command was run by ${user.username}, who joined on ${member.joinedAt}.`);
	},
};