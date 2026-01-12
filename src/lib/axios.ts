import axios from 'axios';

export const weatherApi = axios.create({
    baseURL:
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    timeout: 5000,
});
process.loadEnvFile();
weatherApi.interceptors.request.use(
    (config) => {
        config.params = {
            ...(config.params || {}),
            unitGroup: 'metric',
            contentType: 'json',
            key: process.env.VISUAL_CROSSING_API_KEY,
        };

        return config;
    },
    (error) => Promise.reject(error)
);


weatherApi.interceptors.response.use(
    (response) => response.data, 
    (error) => {
        return Promise.reject({
            message:
                error.response?.data?.message || 'Weather service error',
            status: error.response?.status || 500,
        });
    }
);
