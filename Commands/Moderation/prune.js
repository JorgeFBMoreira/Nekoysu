const { SlashCommandBuilder } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prune up to 100 messages.')
		.addIntegerOption(option => option
            .setName('amount')
			.setDescription('test | Number of messages to prune')
			.setMinValue(1)
			.setMaxValue(100)
        ),
	developer: true,
		
	async execute(interaction) {
		const amount = Math.round(interaction.options.getInteger('amount'));

		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);

			interaction.reply({ 
                content: 'There was an error trying to prune messages in this channel!', 
                ephemeral: true 
            });
		});

		return interaction.reply({ 
            content: `Successfully pruned \`${amount}\` messages.`, 
            ephemeral: true 
        });
	},
};