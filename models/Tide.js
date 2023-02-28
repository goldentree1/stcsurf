import { Schema, models, model } from 'mongoose';

const tideSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    retrieved: {
        type: Date,
        required: true,
    },
    website: {
        type: String,
        enum: ["metocean", "msw", "stormglass"],
        required: true,
    },
    data: [{
        //...
    }]
});

//Forecast model
export const Tide = models.Tide || model("Tide", tideSchema);
