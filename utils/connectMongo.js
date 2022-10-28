import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_ATLAS_URL;

export function connectMongo(){
    console.log("CONNECTED")
    return mongoose.connect(MONGO_URL);
}
export function disconnectMongo(){
    console.log("DISCONNECTED")
    mongoose.disconnect()
}
