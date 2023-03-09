const { ChatInputCommandInteraction, CommandInteractionOptionResolver } = require('discord.js');



module.exports = {
    subCommand: "emojis.full_list",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {        
        const { guild }       = interaction;
        const { splitString } = require('../../../Functions/splitString.js');

        const guildEmojis = guild.emojis.cache;
        const emojis      = guildEmojis.map(emoji => emoji.toString()).join(" ");
        
        if(!emojis) {
            console.log('Something went wrong');

            return await interaction.reply({
                content: `Something went wrong. Please. DM the owner of this bot.`,
            });
        }

        
        
        const delimeter = /(\s+)/;
        const amountOf_emojis = Object.keys(splitString(emojis, delimeter)).length;
        
        await interaction.reply([
            `Found \`${amountOf_emojis}\` out of the \`${amountOf_emojis}\` total amount of Emojis in this Guild.`,
            `Sending them. . .`
        ].join('\n'));
        await interaction.channel.send(emojis);
    },
};