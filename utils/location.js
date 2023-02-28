import { connectMongo } from './mongoDb';
import { Location } from "../models/Location";

export async function getAllLocationsData(){
    connectMongo();
    const locations = await Location.find({});
    return locations;
}

export async function getAllLocationIDs() {
    connectMongo();
    const locations = await Location.find({});
    const Ids = locations.map((location) => ({
        params:{
            id: location.id
        }
    }))
    return Ids;
}

export async function getLocation(id) {
    connectMongo();
    return await Location.findById(id);
}
