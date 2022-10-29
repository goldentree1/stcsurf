import { schedule } from '@netlify/functions';
import { Forecast } from 'models/Forecast';
import { getMetOceanDataByLocation } from 'utils/metOcean';
import { getAllLocationsData } from 'utils/location';

const updateForecasts = async function (event, context) {
    const locations = await getAllLocationsData();
    locations.forEach(async (location) => {
        const data = await getMetOceanDataByLocation(location);
        const forecast = new Forecast({
            data,
            location,
            retrieved: new Date(),
            website: "metocean"
        });
        await forecast.save()
    });
    //TODO: trigger a NextJS re-build here.
    return {
        statusCode: 200,
    }
};
// export const handler = updateForecasts;
export const handler = schedule("@hourly", updateForecasts);
