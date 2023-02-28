import mongoose from 'mongoose';
const mongoUrl = process.env.MONGO_ATLAS_URL;

export function connectMongo(){
    return mongoose.connect(mongoUrl);
};

//Virtuals dont seem to work in Nextjs.. this is a work-around.
export class Virtuals {
    constructor(virtuals) {
        this.virtuals = virtuals;
    }

    //Applies virtual fields to object
    //Very prone to error.. but it works for this project ;-)
    applyTo = (data) => {
        for(let virtual of this.virtuals){
            const virtualVar = virtual.name.split(".");
            if(virtualVar.length === 2){
                data[virtualVar[0]][virtualVar[1]] = virtual.get(data);
            }else{
                throw new Error("Virtual must be nested in 'data'.")
            }
        }
        return data;
    }
}
