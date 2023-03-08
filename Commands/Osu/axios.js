const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const { OSU_ENDPOINT_URL, OSU_TOKEN, PRIVATE_LOGS } = process.env



module.exports = {
	data: new SlashCommandBuilder()
		.setName('axios')
		.setDescription('Testing axios rest api.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    developer: true,

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction) {
        const channelLog = await interaction.client.channels.fetch(PRIVATE_LOGS)
        const { osuApiCall } = require('../../Functions/osuApiCall.js');
        const { response: profile, error } = await osuApiCall(
                '/users/12599585/beatmapsets/most_played', 
                OSU_ENDPOINT_URL, 
                OSU_TOKEN,
                [ 
                    { "limit": "5" }, 
                    { "offset": "0" } 
                ]
            );

        if(error) {
            interaction.reply({
                content: `Something went wrong.`,
                ephemeral: true
            });

            return channelLog.send({
                content: [
                    `Command used: ${interaction.commandName}`,
                    `User: ${interaction.user.tag}\n`,
                    `Status: ${error.status}`,
                    `Status Text: ${error.statusText}`,
                ].join('\n'),
            });
        }

        console.log(profile)
        return interaction.reply({
            content: 'Succesfull!!',
        });
	},
};