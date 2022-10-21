import { connectMongo } from './connectMongo';
import { Location } from "../models/Location";
import { Forecast } from "../models/Forecast";

export async function getAllLocationsData(){
    await connectMongo();
    const locations = await Location.find({});
    return locations;
}

export async function getAllLocationIDs() {
    await connectMongo();
    const locations = await Location.find({})
    const IDs = locations.map((location) => ({
        params:{
            id: location.id
        }
    }))
    return IDs;
}

export async function getForecast(id, date = new Date()) {
    await connectMongo();
    const forecast = await Forecast.findOne({
        location: id,
        retrieved: {
            $lte: new Date(date).setHours(23, 59, 59, 999)
        }
    }).sort({ retrieved: -1 });
    return forecast;
}

export async function getLocation(id) {
    await connectMongo();
    const location = await Location.findById(id)
    return location;
}
