import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('food')
    .setDescription('Order your favorite meals')
    .addStringOption((option) => 
        option
            .setName('food')
            .setDescription('Select your favorite meals')
            .setRequired(true)
            .setChoices(
                { name: 'Cake',      value: 'cake', },
                { name: 'Hamburger', value: 'hamburger', }
            )
    )
    .addStringOption((option) => 
        option
            .setName('drink')
            .setDescription('Select your favorite drinks')
            .setRequired(true)
            .setChoices(
                { name: 'Water',     value: 'water', },
                { name: 'Coca-cola', value: 'coca_cola', },
                { name: 'Sprite',    value: 'sprite', }
            )
    )

export default orderCommand.toJSON();