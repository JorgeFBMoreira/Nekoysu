import { SlashCommandBuilder } from '@discordjs/builders';

// subcommand
const banCommand = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the Guild')
    .addSubcommand(subcommand =>
        subcommand
            .setName('temp')
            .setDescription('Temporary ban a user')
            .addUserOption((option) =>
                option
                    .setName('user')
                    .setDescription('User to be temporary banned')
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('perma')
            .setDescription('Permanently ban a user')
            .addUserOption((option) =>
                option
                    .setName('user')
                    .setDescription('User to be permanently banned')
            )
    )

export default banCommand.toJSON();