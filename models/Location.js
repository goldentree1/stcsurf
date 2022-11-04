import { Schema, models, model } from 'mongoose';

const locationSchema = new Schema({
    location: {
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
    },
    timeZone: {
        type: String,
        enum:["Pacific/Auckland"],
        required: true,
    },
    geometry: { //geoJSON co-ords for mapbox.
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    metserviceCoordinates: { //co-ords for surf forecast (has to be a bit off the coast!)
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        }
    },
});

export const Location = models.Location || model("Location", locationSchema);