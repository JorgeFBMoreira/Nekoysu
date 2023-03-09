const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { OSU_ENDPOINT_URL, OSU_TOKEN, PRIVATE_LOGS } = process.env



module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Osu profile (UNDER DEVELOPMENT).')
        .addStringOption((options) => options
            .setName('username')
            .setDescription('Username or ID')
            .setRequired(true)
        )
        .addStringOption((options) => options
            .setName('gamemode')
            .setDescription('Game Mode')
            .addChoices(
                { name: 'Standard', value: 'osu'    }, 
                { name: 'Taiko',    value: 'taiko'  },
                { name: 'Catch',    value: 'fruits' },
                { name: 'Mania',    value: 'mania'  }
            )
            .setRequired(true)
        )
        .addBooleanOption((options) => options
            .setName('lazer')
            .setDescription('Lazer profile')
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction) {
        const { client, options } = interaction

        const channelLog = await client.channels.fetch(PRIVATE_LOGS)
        const username   = options.getString('username');
        const gamemode   = options.getString('gamemode');

        await interaction.reply({
            content: 'Fetching profile data...',
            fetchReply: true
        })
        
        const { osuApiCall } = require('../../Functions/osuApiCall.js');
        const profile = await osuApiCall(
            `/users/${username}/${gamemode}`,
            { "key": "username" }
        ).catch(async (err) => {
            if(err.status === 404) await interaction.editReply({
                content: `The user \`${username}\` does not exist.`
            });

            else await interaction.followUp({
                content: `Unknown error has accoured. Please, contact the owner of this bot.`,
                ephemeral: true
            });

            throw console.log([
                `\n\n\nSomething went wrong with the following request:`,
                `On ${__dirname}`,
                `When: executing command: ${interaction.commandName}`,
                `> Error Code: ${err.code}`,
                `> Status: ${err.status}`,
                `> Status Text: ${err.statusText}`
            ].join('\n'));
        })

        

        console.log(profile)
        await interaction.editReply('Worked! Check your terminal');
    },
};