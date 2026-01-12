import express from "express";
import rateLimit from "express-rate-limit";
import { getWeather } from "./controllers/weatherController.js";

const app = express();

// 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
app.use(limiter)
app.listen(8080, () => {
    console.log('Listening on 8080');
});

app.get('/weather/:city', limiter, getWeather);