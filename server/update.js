// import {connectMongoose} from '../utils/connectMongo';
// import Location from '../models/Location'
export const handler = async function(event, context){
    // const db = await connectMongoose();
    // const locations = await Location.find({});
    //event and context are provided by netlify.
    //handler receives event object... context is other context in which function is called.
    return{
        statusCode: 200,
        body: JSON.stringify({
            message:"HELLO",
    })
    }
}