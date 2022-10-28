import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_ATLAS_URL;

export async function connectMongo(){
    console.log("CONNECTED")
    return mongoose.connect(MONGO_URL);
}
export async function disconnectMongo(){
    console.log("DISCONNECTED")
    mongoose.disconnect()
}
