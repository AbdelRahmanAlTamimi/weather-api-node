import { createClient } from 'redis';

process.loadEnvFile();

// Initialize Redis client
const getRedisUrl = (): string => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    
    const host = process.env.REDIS_HOST || 'localhost';
    const port = process.env.REDIS_PORT || '6379';
    return `redis://${host}:${port}`;
};

export const redisClient = createClient({
    url: getRedisUrl(),
});

// Handle connection errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

// Connect to Redis (will be called when needed)
let isConnected = false;

export const connectRedis = async (): Promise<void> => {
    if (!isConnected) {
        try {
            await redisClient.connect();
            isConnected = true;
            console.log('Redis client connected');
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            isConnected = false;
        }
    }
};

// Get value from cache
export const getCache = async (key: string): Promise<string | null> => {
    try {
        await connectRedis();
        return await redisClient.get(key);
    } catch (error) {
        console.error('Redis GET error:', error);
        return null;
    }
};

// Set value in cache with expiration
export const setCache = async (key: string, value: string, expirationSeconds: number): Promise<void> => {
    try {
        await connectRedis();
        await redisClient.setEx(key, expirationSeconds, value);
    } catch (error) {
        console.error('Redis SET error:', error);
        // Don't throw - allow API to continue even if cache fails
    }
};
