import { config } from 'dotenv'; config();
import { ActionRowBuilder, Client, CommandInteractionOptionResolver, Routes, SelectMenuBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import orderCommand from './commands/order.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import channelCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import kickCommand from './commands/kick.js';



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

client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        if(interaction.commandName === 'order') {
            console.log('Order Command')
            //console.log(interaction)

            const actionRowComponent = new ActionRowBuilder()
                .setComponents(new SelectMenuBuilder()
                    .setCustomId('food_options')
                    .setOptions(
                        { label: 'Cake',  value: 'cake'  },
                        { label: 'Pizza', value: 'pizza' },
                        { label: 'Sushi', value: 'sushi' },
                    )
                )

            interaction.reply({
                components: [actionRowComponent.toJSON()],
            })
        }
    }
})

async function main() {
    const commands = [orderCommand, rolesCommand, usersCommand, channelCommand, banCommand, kickCommand]

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