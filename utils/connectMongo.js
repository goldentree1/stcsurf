import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_ATLAS_URL;

export function connectMongo(){
    console.log("CONNECTED")
    return mongoose.connect(mongoUrl);
}
export function disconnectMongo(){
    console.log("DISCONNECTED")
    mongoose.disconnect()
}
