import { SlashCommandBuilder } from '@discordjs/builders';

// subcommand group
const kickCommand = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the Guild')
    .addSubcommandGroup((group) => 
        group
            .setName('group_a')
            .setDescription('Group A')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('temp')
                    .setDescription('Temporary kick a user')
                    .addUserOption((option) =>
                        option
                            .setName('user')
                            .setDescription('User to be temporary kicked')
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('perma')
                    .setDescription('Permanently kick a user')
                    .addUserOption((option) =>
                        option
                            .setName('user')
                            .setDescription('User to be permanently kicked')
                    )
            )
    )
    .addSubcommandGroup((group) => 
        group
            .setName('group_b')
            .setDescription('Group B')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('soft')
                    .setDescription('Soft ban')
            )
    )

    
    

export default kickCommand.toJSON();