import { SlashCommandBuilder } from '@discordjs/builders';

// Various other commands type
const channelCommand = new SlashCommandBuilder()
    .setName('channels')
    .setDescription('Channels command')
    .addChannelOption((option) => 
        option
            .setName('channel')
            .setDescription('channel')
            .setRequired(true)
    )
    .addBooleanOption((option) => 
        option
            .setName('deletemsg')
            .setDescription('Delete messages')
            .setRequired(true)
    )
    .addIntegerOption((option) => 
        option
            .setName('age')
            .setDescription('Your age')
            .setRequired(true)
    )
    .addAttachmentOption((option) => 
        option
            .setName('file')
            .setDescription('Send a file')
            .setRequired(true)
    )

export default channelCommand.toJSON();