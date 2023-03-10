const axios = require('axios').default;
const { OSU_CLIENT_ID, OSU_CLIENT_SECRET, OSU_TOKEN } = process.env

// Refresh Bearer Token when it expires
async function refreshAccessToken() {
    try {
        const response = await axios({
            method: 'post',
            url: process.env.OSU_DEV_AUTH,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                client_id: OSU_CLIENT_ID,
                client_secret: OSU_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: 'public'
            }
        });

        process.env.OSU_TOKEN = `Bearer ${response.data.access_token}`;
        console.log('\n\nToken refreshed: ', process.env.OSU_TOKEN);
    } catch (err) {
        console.error('\n\n\n[ERROR] | Error trying to refresh osu!Api (v2) TOKEN!', err);
        throw err;
    };
};


// Axios interceptor to handle expired tokens
async function axiosInterceptor() {
    axios.interceptors.response.use(
        (response) => response,

        (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                return refreshAccessToken().then(() => {
                    originalRequest.headers.Authorization = `Bearer ${process.env.OSU_TOKEN}`;
                    return axios(originalRequest);
                });
            }

            return Promise.reject(error);
        }
    );
}

module.exports = { axiosInterceptor };