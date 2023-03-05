const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv'); config();
const { BOT_TOKEN } = process.env;

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({ 
	intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember] 
});



client.events = new Collection();
client.commands = new Collection();

const { loadEvents } = require('./Handlers/eventHandler.js');
loadEvents(client)



client.login(BOT_TOKEN);