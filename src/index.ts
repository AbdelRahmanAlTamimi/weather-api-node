import express from "express";
import { getWeather } from "./controllers/weatherController.js";

const app = express();
app.listen(8080, () => {
    console.log('Listening on 8080');
});

app.get('/weather/:city', getWeather);