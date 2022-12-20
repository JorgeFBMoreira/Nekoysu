import { config } from 'dotenv';
import { Client } from 'discord.js';

config()

const client = new Client({
    intents: ['Guilds', 'GuildMessages']
})

const TOKEN = process.env.NEKOYSU_BOT_TOKEN

console.log("Checking bot token: ", process.env.NEKOYSU_BOT_TOKEN)

client.login(TOKEN)

console.log("BOT LOGGED IN")