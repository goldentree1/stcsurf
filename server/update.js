import { schedule } from '@netlify/functions';
import { Forecast } from 'models/Forecast';
import { connectMongo } from 'utils/connectMongo';
import { getMetOceanDataByLocation } from 'utils/metOcean';
import { getAllLocationsData } from 'utils/location';

const updateForecasts = async function (event, context) {
    await connectMongo();
    const locations = await getAllLocationsData();
    locations.forEach(async (location) => {
        const data = await getMetOceanDataByLocation(location);
        console.log("DATA RETRIEVED: " + data);
        const forecast = new Forecast({
            data,
            location,
            retrieved: new Date(),
            website: "metocean"
        });
        const saved = await forecast.save()
        console.log("SAVED FORECAST?: " + saved);
    });
    //TODO: trigger a NextJS re-build here.
    return {
        statusCode: 200,
    }
};
// export const handler = updateForecasts;
export const handler = schedule("@hourly", updateForecasts);
