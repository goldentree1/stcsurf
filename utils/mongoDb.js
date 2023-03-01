import mongoose from 'mongoose';
const mongoUrl = process.env.MONGO_ATLAS_URL;

/**
 * Connects to the Mongo database.
 * @returns 
 */
export function connectMongo() {
    return mongoose.connect(mongoUrl);
};

/**
 * Class to fake Mongoose Virtuals (fields that are calculated by a formula from existing data)
 * This allows, for example, the wave-face formula to be easily altered for all past and present data
*/
export class Virtuals {
    constructor(virtuals) {
        this.virtuals = virtuals;
    }

    //Applies virtual fields to object
    //Very prone to error.. but it works for this project ;-)
    applyTo = (data) => {
        for (let virtual of this.virtuals) {
            const virtualVar = virtual.name.split(".");
            if (virtualVar.length === 2) {
                data[virtualVar[0]][virtualVar[1]] = virtual.get(data);
            } else {
                throw new Error("Virtual must be nested in 'data'.")
            }
        }
        return data;
    }
}
