import { config } from 'dotenv'; config();
import { Client } from 'discord.js';


const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent']
})

client.login(process.env.NEKOYSU_BOT_TOKEN)



client.on('ready', () => {
    console.log(`Bot ${client.user.tag} has logged in`)
})

client.on('messageCreate', (message) => {
    console.log(message.content, message.createdAt.toDateString(), message.author.tag)
})

client.on('channelCreate', (channel) => {
    console.log('Channel Created\n', channel)
})