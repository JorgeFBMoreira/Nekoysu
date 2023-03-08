const { ChatInputCommandInteraction } = require('discord.js');



module.exports = {
    subCommand: "emojis.search",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {        
        const { guild, options }        = interaction;
        const { emojiLoader }  = require('../../../Functions/emojisLoader.js');
        const { renderEmojis } = require('../../../Functions/emojisRender.js');
        //const split = /\s*(?:;|$)\s*/;
        //const requestEmojis = getEmojisProvided.split(split)

        const getEmojisProvided = options.getString('name');
        const delimiters = `;.,-${/\s*(?:;|$)\s*/}`;

        function splitText(delimeter, string) {
            return string.match(
                new RegExp(`(${delimeter}|[^${delimeter}]+)`, "g")
            );
        }

        const requestEmojis = splitText(delimiters, getEmojisProvided);




        const guildEmojis = guild.emojis.cache;
        const emojis      = await emojiLoader(guildEmojis, requestEmojis);
        console.log('\n\n\nemojis:', emojis);

        if(!emojis) {
            console.log('Something went wrong');

            return interaction.reply({
                content: `Couldn't find the following emojis:\n\`${requestEmojis}\``,
            });
        }
        
        await interaction.reply('Worked. Emojis available for use [in this interaction]:');
        await interaction.channel.send(renderEmojis(emojis));
    },
};