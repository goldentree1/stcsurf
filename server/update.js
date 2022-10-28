// import { schedule } from '@netlify/functions';
import { Forecast } from 'models/Forecast';
import { getMetOceanData } from 'utils/metOcean';
import { getAllLocationsData } from 'utils/location';

const updateForecasts = async function (event, context) {
    const locations = await getAllLocationsData();
    const forecasts=[];//
    locations.forEach(async (location) => {
        const { metserviceCoordinates: { lat, lon } } = location;
        const data = await getMetOceanData(lat, lon);
        const forecast = new Forecast({
            data,
            location,
            retrieved: new Date(),
            website: "metocean"
        });
        forecasts.push(forecast);//
    });
    //TODO: trigger a NextJS re-build here.
    return {
        statusCode: 200,
        forecasts//
    }
};
export const handler = updateForecasts;
// export const handler = schedule("@hourly", updateForecasts);
