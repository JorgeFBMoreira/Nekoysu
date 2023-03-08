const axios = require('axios').default;

async function refreshingOsuApiToken() {
    let error;

    try {
        const data = await axios({
            method: 'post',
            url: process.env.OSU_DEV_AUTH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                client_id: process.env.OSU_CLIENT_ID,
                client_secret: process.env.OSU_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: 'public'
            }
        });

        process.env.OSU_TOKEN = 'Bearer ' + data.data.access_token;
        console.log('[OSU_TOKEN] | Refreshed Osu Token to:', process.env.OSU_TOKEN)
    } catch (err) {
        error = err.response;
    }

    return error;
};



module.exports = { refreshingOsuApiToken }