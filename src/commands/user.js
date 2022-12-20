import { SlashCommandBuilder } from '@discordjs/builders';

// user
const usersCommand = new SlashCommandBuilder()
    .setName('users')
    .setDescription('Users command')
    .addUserOption((option) => 
        option
            .setName('user')
            .setDescription('Adds the new role')
    )

export default usersCommand.toJSON();