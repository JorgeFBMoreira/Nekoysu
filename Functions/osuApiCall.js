const axios = require('axios').default;
const { OSU_ENDPOINT_URL, OSU_TOKEN } = process.env 

// 
/**
 * Call osu!Api (V2)
 * @param   {Strinng}     url    URL to make a request
 * @param   {Object}      params Parameters as a `Object`
 * @returns {Object|null}        `Object` or Throw `null`
 */
async function osuApiCall(url, params) {
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

        return data.data;
    } catch (err) {
        console.log(err)
        throw err;
    }
};



module.exports = { osuApiCall }