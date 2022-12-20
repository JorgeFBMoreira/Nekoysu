import { config } from 'dotenv'; config();
import { Client, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent']
})

const BOT_TOKEN = process.env.NEKOYSU_BOT_TOKEN
const BOT_ID = process.env.NEKOYSU_BOT_ID
const GUILD_ID = process.env.NEKOYSU_GUILD_ID

const rest = new REST({ version: 10 }).setToken(BOT_TOKEN)



client.on('ready', () => {
    console.log(`Bot ${client.user.tag} has logged in`)
})



async function main() {
    const commands = [
        {
            name: 'test',
            description: 'testing command',
        },

        {
            name: 'test2',
            description: 'another testing command',
        },
    ]

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
            body: commands,
        });

        client.login(BOT_TOKEN)
    }


    catch (err) {
        console.log(err)
    }
}

main()



/*(async () => {
    try {
  
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
})();*/