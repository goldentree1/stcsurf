import { Schema, models, model } from 'mongoose';
import { Virtuals } from 'utils/mongoDb';

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
    data:{
        /* swell:{
            type:[Number],
            required: true,
        },
        chop:{
            type:[Number],
            required: true,
        },
        swellDir:{
            type:[Number],
            required: true,
        },
        windDir10m:{
            type:[Number],
            required: true,
        },
        virtuals:{}, */
    }
    /* can still structure this if we give it an empty virtuals object in data like above?
    then on front-end, just destructure EG {virtuals:{faces}, swell, chop, ... etc.} ??? */
});

export const Forecast = models.Forecast || model("Forecast", forecastSchema);

export const forecastVirtuals = new Virtuals([
    {
        name: "data.face",
        get: function(forecast){
            const { swell, period, chop } = forecast.data;
            const faces = swell.map((swell, i) => {
                if (!swell) return null; //  (!swell||!period[i]||!chop[i]) ??
                const face = swell * period[i] * 0.0896 + 0.624;
                return face < chop[i] ? chop[i] : face;
            })
            return faces;
        }
    },
]);
