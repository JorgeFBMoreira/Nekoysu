const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');



module.exports = {
    developer: true,

    data: new SlashCommandBuilder()
        .setName('emojis')
        .setDescription('Emojis command')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false) // Not implemented
        .addSubcommand((options) => options
            .setName("full_list")
            .setDescription('Get a full list of emojis that can be used with this bot.')
        )
        .addSubcommand((options) => options
            .setName("search")
            .setDescription('Choose your own emojis.')
            .addStringOption((options) => options
                .setName('name')
                .setDescription('Type the name of each emote to be displayed: mode_std-mode_mania...')
                .setRequired(true)
            )
        ),
};