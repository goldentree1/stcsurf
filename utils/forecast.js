import { connectMongo } from './mongoDb';
import { Forecast, forecastVirtuals } from "../models/Forecast";

//Returns forecast for given location ID and date
export async function getForecast(id, date = new Date()) {
    connectMongo();
    let forecast = await Forecast.findOne({
        location: id,
        retrieved: {
            $lte: new Date(date)
        }
    }).sort({ retrieved: 'desc' });
    return forecastVirtuals.applyTo(forecast);
}
