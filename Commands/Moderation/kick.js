const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption((options) => options
            .setName('target')
            .setDescription('The member to kick')
        )
        .setDMPermission(false),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		
		return interaction.reply({ 
            content: `You wanted to kick: ${member.user.username}`, 
            ephemeral: true 
        });
	},
};