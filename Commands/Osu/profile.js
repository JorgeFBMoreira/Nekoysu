const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { config } = require('dotenv'); config();
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
        ,
    
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction
     */
	async execute(interaction) {
        const { client, options } = interaction

        const channelLog = await client.channels.fetch(PRIVATE_LOGS)
        const username   = options.getString('username');
        const gamemode   = options.getString('gamemode');
        
        const { osuApiCall } = require('../../Functions/osuApiCall.js');
        const { response: profile, error } = await osuApiCall(
            `/users/${username}/${gamemode}`, 
            OSU_ENDPOINT_URL, 
            OSU_TOKEN,
            { "key": "username" }
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



        const Embed = new EmbedBuilder()
            .setAuthor({ name: `osu!${profile.rankHistory.mode} | ${profile.username}` })
            .setDescription([
                `Rank: ${profile.statistics.global_rank} | ${profile.statistics.country_rank} :flag_${profile.country.code.toLowerCase()}:`,
                `PP: ${Math.round(profile.statistics.pp).toLocaleString('en-US')}`,
            ].join('\n'));
            
        return interaction.reply({
            embeds: [Embed]
        });
	},
};