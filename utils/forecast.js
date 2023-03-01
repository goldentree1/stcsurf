import { connectMongo } from './mongoDb';
import { Forecast, forecastVirtuals } from "../models/Forecast";

/*
* Returns forecast for given location ID and date
* @param
*/

/**
 * Gets a single Forecast from the database
 * @param {string} id ID of the Location
 * @param {Date} date Date to retrieve Forecast from
 * @returns {Forecast} Forecast with virtuals applied
 */
export async function getForecast(id, date = new Date()) {
    connectMongo();
    //can this be const?
    let forecast = await Forecast.findOne({
        location: id,
        retrieved: {
            $lte: new Date(date)
        }
    }).sort({ retrieved: 'desc' });

    //Apply faked 'mongoose virtuals' to Forecast object
    return forecastVirtuals.applyTo(forecast);
}
