import { Schema, models, model } from 'mongoose';

const forecastSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
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
    data:{}
});

export const Forecast = models.Forecast || model("Forecast", forecastSchema);