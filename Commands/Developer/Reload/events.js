const { ChatInputCommandInteraction } = require('discord.js');
const { loadEvents } = require('../../../Handlers/eventHandler.js');



module.exports = {
    subCommand: "reload.events",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.client.removeAllListeners();

        loadEvents(interaction.client);
        return interaction.reply({
            content: "Reloaded Events",
            ephemeral: true,
        });
    },
};