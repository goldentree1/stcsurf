import { TimeScale } from 'chart.js';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_ATLAS_URL;


export function connectMongo(){
    return mongoose.connect(mongoUrl);
};

export class Virtuals {
    constructor(virtuals) {
        this.virtuals = virtuals;
    }
    //Need to test this out
    applyTo = (data) => {
        let virtuals = {};
        for(let virtual of this.virtuals){
            const virtualVar = virtual.name.split(".")
            //Working, but a bit rigid!!
            if(virtualVar.length === 2){
                data[virtualVar[0]][virtualVar[1]] = virtual.get(data)
            }else{
                throw new Error("Virtual must be nested in 'data'... and no, idk why.")
            }
        }
        return data;
    }
}

//inrended use EG:
//const forecastVirtuals = new Virtuals({obj});
//const fullForecast = forecastVirtuals.applyTo(forecast)
