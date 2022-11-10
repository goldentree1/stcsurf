import axios from 'axios';
import { schedule } from '@netlify/functions';
import { Forecast } from 'models/Forecast';
import { connectMongo } from 'utils/mongoDb';
import { getMetOceanDataByLocation } from 'utils/metOcean';
import { getAllLocationsData } from 'utils/location';

const updateForecasts = async function (event, context) {
    connectMongo();
    const locations = await getAllLocationsData();
    for(let location of locations){
        // const data = await getMetOceanDataByLocation(location);
        // const forecast = new Forecast({
        //     data,
        //     location,
        //     retrieved: new Date(),
        //     website: "metocean"
        // });
        // await forecast.save();
        await new Forecast({
            data: await getMetOceanDataByLocation(location),
            location,
            retrieved: new Date(),
            website: "metocean"
        }).save()

        //Rewrite for simplicity as:
        /* await new Forecast({
            data: await getMetOceanDataByLocation(location),
            location,
            retrieved: new Date(),
            website: "metocean"
        }).save()
        */

        // const tideData = await getStormGlassTideDataByLocation(location);
        // const tide = new Tide({
        //     tideData,
        //     location,
        //     retrieved: new Date(),
        //     website:"stormglass"
        // })
    }
    
    //Trigger page re-build
    await axios.post(`${process.env.REBUILD_HOOK}`);

    return {
        statusCode: 200,
    }
};
// export const handler = updateForecasts;
export const handler = schedule("@hourly", updateForecasts);
