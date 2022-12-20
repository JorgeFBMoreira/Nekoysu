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

client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        interaction.reply({
            content: `You ordered \`${interaction.options.get('food').name}\` and \`${interaction.options.get('drink').name}\``
        })
    }
})


async function main() {
    const commands = [
        {
            name: 'order',
            description: 'order something',
            options: [
                {
                    name: 'food',
                    description: 'the type of food',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'Cake',
                            value: 'cake',
                        },

                        {
                            name: 'Hamburger',
                            value: 'hamburger',
                        },
                    ],
                },

                {
                    name: 'drink',
                    description: 'the type of drink',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'Water',
                            value: 'water',
                        },

                        {
                            name: 'Coca-cola',
                            value: 'coca_cola',
                        },

                        {
                            name: 'Sprite',
                            value: 'sprite',
                        },
                    ],
                },
            ],
        },

        {
            name: 'test',
            description: 'testing command',
        },

        {
            name: 'test2',
            description: 'another testing command',
        },
    ]

    console.log(commands)

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