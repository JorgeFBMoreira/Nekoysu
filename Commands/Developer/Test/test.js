const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Testing EmbedBuilder()')
		.addStringOption((options) => options
            .setName('input')
            .setDescription('The input to echo back')
        )
        .addIntegerOption((options) => options
            .setName('boop_reminder')
            .setDescription('How often should we remind you to boop the user')
            .addChoices(
                { name: 'Every day', value: 1 },
                { name: 'Weekly',    value: 7 }
            ),
        )
        .setDMPermission(false),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction) {
        const { options } = interaction;
        const input = options.getString('input')          || 'No input provided';
        const boop  = options.getInteger('boop_reminder') || 'No boop provided';

		return interaction.reply({ 
            content: `Worked: \`${input}\`. Test\n${boop}\n${process.env.CLIENT_ID}`, 
            ephemeral: true 
        });
	},
};