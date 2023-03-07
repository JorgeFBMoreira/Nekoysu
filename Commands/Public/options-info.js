const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('options-info')
		.setDescription('Information about the options provided.')
		.addStringOption((options) => options
            .setName('input')
            .setDescription('The input to echo back')
        ),

    /**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */    
	async execute(interaction) {
		const value = interaction.options.getString('input');
		if (value) return interaction.reply(`The options value is: \`${value}\``);
		
		return interaction.reply('No option was provided!');
	},
};