const { ChatInputCommandInteraction } = require('discord.js');



module.exports = {
    subCommand: "emojis.full_list",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {        
        const { guild }        = interaction;
        const { emojiLoader, renderEmojis }  = require('../../../Functions/emojisLoader.js');

        const guildEmojis = guild.emojis.cache;
        const emojis      = guildEmojis.map(emoji => emoji.toString()).join(" ");
        
        if(!emojis) {
            console.log('Something went wrong');

            return await interaction.reply({
                content: `Something went wrong when requesting emojis.`,
            });
        }


        
        await interaction.reply('Worked. Emojis available for use [in this interaction]:');
        await interaction.channel.send(emojis);
    },
};