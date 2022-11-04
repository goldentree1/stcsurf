import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_ATLAS_URL;

export function connectMongo(){
    return mongoose.connect(mongoUrl);
}
