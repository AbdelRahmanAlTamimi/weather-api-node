import { Request, Response } from "express";
import { weatherApi } from "../lib/axios.js";

export async function getWeather (req: Request, res: Response)  {
    const { city } = req.params;
    const response = await weatherApi.get(city as string);
    return res.json(response.data);
};
