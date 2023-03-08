const { ChatInputCommandInteraction } = require('discord.js');



module.exports = {
    subCommand: "emojis.search",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {        
        const { guild, options } = interaction;
        const { emojiLoader, renderEmojis }  = require('../../../Functions/emojisLoader.js');
        const { splitText }                  = require('../../../Functions/splitText.js');
        
        const getEmojisProvided = options.getString('name');
        const delimiters        = `;.,-${/\s*(?:;|$)\s*/}`;
        const requestEmojis = splitText(getEmojisProvided, delimiters);


        
        const guildEmojis = guild.emojis.cache;
        const emojis      = await emojiLoader(guildEmojis, requestEmojis);
        
        if(emojis.error) {
            console.log(`\n\n\n[NOT FOUND] on ${__dirname} [searchEmoji]\n`, emojis.error);

            return await interaction.reply({
                content: [
                    `${emojis.error}\n> Requested Emojis [array]: \`${requestEmojis.join(' | ')}\``,
                ].join('\n'),
            });
        }


        
        await interaction.reply('Worked. Emojis available for use [in this interaction]:');
        await interaction.channel.send(renderEmojis(emojis));
    },
};