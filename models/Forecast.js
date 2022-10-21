import { Schema, models, model } from 'mongoose';

const options = {
    toJSON: {
        virtuals: true,
    }
}

const forecastSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId, //must be assigned to a location
        ref: "Location",
        required: true,
    },
    website: {
        type: String,
        enum: ["metocean", "msw"],
        required: true,
    },
    retrieved: {
        type: Date,
        required: true,
    },
    data: {

    }
}, options);

export const Forecast = models.Forecast || model("Forecast", forecastSchema);