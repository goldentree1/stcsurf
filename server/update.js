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
        await new Forecast({
            location,
            data: await getMetOceanDataByLocation(location),
            retrieved: new Date(),
            website: "metocean"
        }).save()

        // await new Tide({
        //     data: await getStormGlassTideDataByLocation(location),
        //     location,
        //     retrieved: new Date(),
        //     website:"stormglass"
        // }).save()
    }
    
    //Trigger page re-build
    await axios.post(`${process.env.REBUILD_HOOK}`);

    return {
        statusCode: 200,
    }
};
// export const handler = updateForecasts;
export const handler = schedule("1 */12 * * *", updateForecasts);
