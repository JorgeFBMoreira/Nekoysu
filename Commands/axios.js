const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
const { config } = require('dotenv'); config();
const { OSU_ENDPOINT_URL, OSU_TOKEN, PRIVATE_LOGS } = process.env

module.exports = {
	data: new SlashCommandBuilder()
		.setName('axios')
		.setDescription('Testing axios rest api.'),
    
	async execute(interaction) {
        const channelLog = await interaction.client.channels.fetch(PRIVATE_LOGS)

        await axios({
            method: 'get',
            url: '/users/yHuesos_/osu',
            baseURL: OSU_ENDPOINT_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OSU_TOKEN}`
            },
            params: {
                ID: 12345,
            },
        }).then(function (response) {
            interaction.reply({
                content: 'Succesfull!'
            })
        }).catch((err) => {
            //console.log(`\n\n\n\n\n\n\n\n\n[ERROR] | An error happened:\n`, err);

            interaction.reply({
                content: `[ERROR] | An error happened\n\n• Code: ${err.response.status}\n• Message: ${err.response.statusText}`
            })

            const errorArray = [];
            
            if(err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                errorArray
            }

            channelLog.send({
                content: `[ERROR] | An error happened while using </${interaction.commandName}>\n\n• Code: ${err.response.status}\n• Message: ${err.response.statusText}`,
                ephemeral: true
            })
        });
	},
};