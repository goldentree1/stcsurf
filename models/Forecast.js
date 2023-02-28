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
    //Cant use virtuals if we give the data a structure...
    //But the above is how it should look (it works, and cbf fixing)
});

//Forecast model
export const Forecast = models.Forecast || model("Forecast", forecastSchema);

/**
 * My 'pretend' virtual for wave face...
 * Couldn't get actual virtuals to work with next.js
 * and mongoose... but this works.
 */
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
