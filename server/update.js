import axios from 'axios';
import { schedule } from '@netlify/functions';
import { Forecast } from 'models/Forecast';
import { connectMongo } from 'utils/connectMongo';
import { getMetOceanDataByLocation } from 'utils/metOcean';
import { getAllLocationsData } from 'utils/location';

const updateForecasts = async function (event, context) {
    // connectMongo();
    const locations = await getAllLocationsData();
    for(let location of locations){
        const data = await getMetOceanDataByLocation(location);
        const forecast = new Forecast({
            data,
            location,
            retrieved: new Date(),
            website: "metocean"
        });
        await forecast.save()
    }
    
    //Trigger page re-build
    axios.post(`${process.env.REBUILD_HOOK}`);

    return {
        statusCode: 200,
    }
};
// export const handler = updateForecasts;
export const handler = schedule("@hourly", updateForecasts);
