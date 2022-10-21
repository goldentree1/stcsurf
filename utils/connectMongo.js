import mongoose from 'mongoose';
const MONGO_URL = 'mongodb+srv://eb:ICbirNbdgyA72O85@cluster0.zsfs34t.mongodb.net/?retryWrites=true&w=majority';

export async function connectMongo(){
    return mongoose.connect(MONGO_URL);
}