const { ChatInputCommandInteraction } = require('discord.js');
const { loadCommands } = require('../../../Handlers/commandHandler.js');



module.exports = {
    subCommand: "reload.commands",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        loadCommands(interaction.client);

        interaction.reply({
            content: "Reloaded Commands ",
            ephemeral: true
        });
    }
};