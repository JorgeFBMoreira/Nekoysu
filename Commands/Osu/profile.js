const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { OSU_ENDPOINT_URL, OSU_TOKEN, PRIVATE_LOGS } = process.env
const { emojiLoader } = require('../../Functions/emojis.js');

/**
 * Returns formatted `String` with the proper `gamemode` name.
 * @param   {String|null} requested_Gamemode 
 * @param   {String} playmode 
 * @param   {String} username 
 * @param  {...any} emojis 
 * @returns {String} Returns `String`
 */
function gamemode(requested_Gamemode, playmode, username, emojis) {
    let gamemode = requested_Gamemode ? requested_Gamemode : playmode
    let gamemodeEmoji;

    switch(gamemode) {
        case 'osu': {
            gamemode      = 'Standard';
            gamemodeEmoji = emojis.mode_std;
        }; break;

        case 'taiko': {
            gamemode = 'Taiko';
            gamemodeEmoji = emojis.mode_taiko;
        }; break;

        case 'fruits': {
            gamemode = 'Catch';
            gamemodeEmoji = emojis.mode_ctb;
        }; break;

        case 'mania': {
            gamemode = 'Mania';
            gamemodeEmoji = emojis.mode_mania;
        }; break;
    }

    return `${gamemodeEmoji} osu!${gamemode} | Profile of ${username}`;
}

function getFlag(country) {
    return String.fromCodePoint(
        ...[...country.toUpperCase()]
        .map(code => 0x1f1a5 + code.charCodeAt())
    )
}


// UNDER DEVELOPMENT
module.exports = {
    developer: true,

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
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ,
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
	async execute(interaction) {
        const {guild: {emojis: { cache: guildEmojis }}, client, options } = interaction;
        const requested_Username = options.getString('username');
        const requested_Gamemode = options.getString('gamemode');

        await interaction.reply({
            content: 'Fetching profile data...',
            fetchReply: true
        })
        const { osuApiCall } = require('../../Functions/osuApiCall.js');
        const profile = await osuApiCall(
            `/users/${requested_Username}${requested_Gamemode 
                ? `/${requested_Gamemode}` 
                : ''}`,
            { "key": "username" }
        ).catch(async (err) => {
            if(!err.response.status) throw err;
            
            if(err.response.status === 404 && err.response.statusText === 'Not Found' && err.response.data.error === null) {
                await interaction.editReply({
                    content: `The user \`${requested_Username}\` does not exist.`
                });
                
                throw null;
            }
            
            await interaction.deleteReply();
            await interaction.followUp({
                content: `Unknown error has accoured. Please, contact the owner of this bot.`,
                ephemeral: true
            });
            
            console.log([
                `\n\n\nSomething went wrong with the following request:`,
                `On ${__dirname}`,
                `When: executing command: ${interaction.commandName}`,
                `> Error Code: ${err.code}`,
                `> Status: ${err.response.status}`,
                `> Status Text: ${err.response.statusText}`
                `> Response code: ${err.response.data.error}\n\n`
            ].join('\n'));
            throw err;
        })
        
        
        
        const emojis = await emojiLoader(guildEmojis, ['mode_std', 'mode_ctb', 'mode_taiko', 'mode_mania', 'rank_silverss', 'rank_ss', 'rank_silvers', 'rank_s', 'rank_a']);
        const { 
            avatar_url, 
            id, 
            country_code, 
            is_online,
            last_visit,
            username,
            join_date,
            playmode,
            statistics: {
                global_rank,
                pp,
                hit_accuracy,
                play_count,
                country_rank,
                total_score,
                grade_counts: {
                    ss,
                    ssh,
                    s,
                    sh,
                    a,
                },
            },
        } = profile;       


        const embed = new EmbedBuilder()
            .setColor('#D1BD94')
            .setTitle(gamemode(requested_Gamemode, playmode, username, emojis))
            .setURL(`https://osu.ppy.sh/users/${id}`)
            .setDescription([
                `・ Ranked: \`#${global_rank.toLocaleString("en-US")}\` (\`#${country_rank}\`${getFlag(country_code)})`,
                `・ PP: \`${Math.round(pp).toLocaleString("en-US")}\``,
                `・ Accuracy: \`${Math.round(hit_accuracy * 100) / 100}\``,
                `・ Play Count: \`${play_count.toLocaleString("en-US")}\``,
                `・ Total Score: \`${total_score.toLocaleString("en-US")}\`\n`,
                `・ ${emojis.rank_silverss}\`${ssh}\` | ${emojis.rank_ss}\`${ss}\` | ${emojis.rank_silvers}\`${sh}\` | ${emojis.rank_s}\`${s}\` | ${emojis.rank_a}\`${a}\``,
            ].join('\n'))
            .setThumbnail(avatar_url)
            .setFooter({ text: `${username} is currently ${is_online ? 'Online' : 'Offline'}` });
 
        await interaction.editReply({
            embeds: [embed]
        });

        if(!emojis.error) return;
        throw `Coudln't find the following emojis: ${emojis.error}`;
    },
};