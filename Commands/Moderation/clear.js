const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete up to 100 messages.')
		.addIntegerOption((options) => options
            .setName('amount')
			.setDescription('Number of messages to delete')
			.setMinValue(1)
			.setMaxValue(100)
        )
        .setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	developer: true,
		
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction
	 */
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