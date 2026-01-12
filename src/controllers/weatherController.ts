import { Request, Response } from "express";
import { weatherApi } from "../lib/axios.js";
import { getCache, setCache } from "../lib/redis.js";

const CACHE_EXPIRATION_SECONDS = 12 * 60 * 60; // 12 hours

export async function getWeather(req: Request, res: Response) {
    try {
        const city = req.params.city;
        if (!city || Array.isArray(city) || city.trim() === '') {
            return res.status(400).json({ error: 'City is required' });
        }
        if (/^\d+$/.test(city.trim())) {
            return res.status(400).json({ error: 'Invalid city name' });
        }

        // Normalize city for cache key
        const normalizedCity = city.trim().toLowerCase();
        const cacheKey = `weather:${normalizedCity}`;

        // Check cache first
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Cache miss - make API call
        const response = await weatherApi.get(city);
        const weatherData = response.data;

        // Store in cache with 12-hour expiration
        await setCache(cacheKey, JSON.stringify(weatherData), CACHE_EXPIRATION_SECONDS);

        return res.json(weatherData);

    } catch (error: any) {
        console.error('Weather API Error:', error.message);

        if (error.response) {
            const status = error.response.status;

            if (status === 404 || status === 400) {
                return res.status(404).json({ error: 'City not found' });
            }

            return res.status(503).json({ error: 'Weather service unavailable' });
        }

        return res.status(503).json({ error: 'Weather service not responding' });
    }
}