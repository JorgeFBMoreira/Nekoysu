const axios = require('axios').default;



async function osuApiCall(url, OSU_ENDPOINT_URL, OSU_TOKEN, params) {
    let response, error;
    
    try {
        const data = await axios({
            method: 'get',
            url: url,
            baseURL: OSU_ENDPOINT_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OSU_TOKEN}`
            },
            params: {
                params,
            },
        });

        response = data.data;
    } catch (err) {
        console.log(err);

        error = err.response;
    }
    
    return { response, error };
}



module.exports = { osuApiCall }