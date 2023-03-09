const { ChatInputCommandInteraction } = require('discord.js');



module.exports = {
    subCommand: "emojis.search",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {        
        const { guild, options } = interaction;
        const { emojiLoader, emojisToString } = require('../../../Functions/emojis.js');
        const { splitString } = require('../../../Functions/splitString.js');
        
        const getEmojisProvided = options.getString('name');
        let   delimeter         = `;.,-${/\s*(?:;|$)\s*/}`;
        const requestEmojis     = splitString(getEmojisProvided, delimeter);

        const guildEmojis = guild.emojis.cache;
        const emojis = await emojiLoader(guildEmojis, requestEmojis);
        
        if(Object.keys(emojis).length <= 1) return await interaction.reply([
            `[NOT FOUND] Couldn't find any of the emojis provided:`,
            `> Requested Emojis: \`${requestEmojis.join(', ')}\``,
        ].join('\n'));



        const emojisNotFound = emojis.error;
        delete emojis.error;
        
        const amountOf_requestedEmojis = Object.keys(requestEmojis).length;
        const amountOf_emojisFound     = Object.keys(emojis).length;
        await interaction.reply([
            `Found \`${amountOf_emojisFound}\` out of \`${amountOf_requestedEmojis}\` requested emoji${ amountOf_requestedEmojis > 1 ? 's' : '' }.`,
            `${emojisNotFound ? `Wasn't able to find the following emojis: ${emojisNotFound}\n` : ''}`,
            'Sending emojis. . .'
        ].join('\n'));
        await interaction.channel.send(emojisToString(emojis));
    },
};