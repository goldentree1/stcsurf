import { connectMongo } from "../utils/connectMongo"

async function updateForecast() {
    const db = await connectMongo();
    //1. check most recent DB-saved forecast date
    //2. return if current forecast is within 1 hour of previous forecast (this will allow us to not go over metocean limits!)
    //3. contact metocean api using .env key
    //4. save metocean res in DB.
    //5. Run build script from URL that netlify gives for 'build hooks'
};

updateForecast();