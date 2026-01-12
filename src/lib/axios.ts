import axios from 'axios';

export const weatherApi = axios.create({
    baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    timeout: 5000,
});

process.loadEnvFile();

weatherApi.interceptors.request.use((config) => {
    config.params = {
        unitGroup: 'metric',
        contentType: 'json',
        key: process.env.VISUAL_CROSSING_API_KEY,
    };
    return config;
});