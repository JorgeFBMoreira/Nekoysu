const axios = require('axios').default;
const { OSU_ENDPOINT_URL, OSU_TOKEN } = process.env 

// Calls osu!Api. Current Endpoint: v2
async function osuApiCall(url, params) {
    let response, error;
    
    try {
        const data = await axios({
            method: 'get',
            url: url,
            baseURL: OSU_ENDPOINT_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': OSU_TOKEN
            },
            params: {
                params,
            },
        });

        response = data.data;
    } catch (err) {
        // OSU_TOKEN Expired -> Refresh
        if(err.code === 'ERR_BAD_REQUEST' && err.response.status === 401 && err.response.statusText === 'Unauthorized' && err.response.data.authentication === 'basic') {
            const { refreshingOsuApiToken } = require('./refreshingOsuApi.js');
            const errorRefreshingToken = await refreshingOsuApiToken();
    
            if(errorRefreshingToken) return err = errorRefreshingToken.response;
            return osuApiCall(url, OSU_ENDPOINT_URL, process.env.OSU_TOKEN, params);            
        }

        error = err.response;
    }
    
    return { response, error };
};



module.exports = { osuApiCall }