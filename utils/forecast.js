import { connectMongo } from './connectMongo';
import { Forecast } from "../models/Forecast";

//Returns forecast for given location ID and date
export async function getForecast(id, date = new Date()) {
    await connectMongo();
    const forecast = await Forecast.findOne({
        location: id,
        retrieved: {
            $lte: new Date(date)
            //Check for $gte? Or could do client-side instead (may be better with local times?)
        }
    }).sort({ retrieved: 'desc' });

    //'Pretend mongoose virtuals' - because they aint working.
    const {swell, period, chop} = forecast.data;
    forecast.data.face = calculateWaveFaces(swell, period, chop);
    return forecast;
}

//Returns values for 'faces' - this should be a mongoose virtual
function calculateWaveFaces(swells, periods, chops){
    const faces = swells.map((swell, i)=>{
        if(!swell) return null;
        const face = swell * periods[i] * 0.0896 + 0.624;
        return face < chops[i] ? chops[i] : face;
    })
    return faces;
}
