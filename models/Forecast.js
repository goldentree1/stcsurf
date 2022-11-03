import { Schema, models, model } from 'mongoose';
import { Virtuals } from 'utils/mongoDb';

const options = {
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true
    }
}

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
    data: {
        chop:{
            type: [Number],
        },
        direction:{
            type:[Number],
        },
        period:{
            type:[Number],
        },
        swell:{
            type:[Number]
        },
        wind10m:{
            type:[Number]
        },
        windGust10m:{
            type:[Number]
        },
        windDir10m:{
            type:[Number]
        },
        time:{},
    },
});

export const Forecast = models.Forecast || model("Forecast", forecastSchema);

export const forecastVirtuals = new Virtuals([
    {
        name: "data.faces",
        get: function(forecast){
            const { swell, period, chop } = forecast.data;
            const faces = swell.map((swell, i) => {
                if (!swell) return null;
                const face = swell * period[i] * 0.0896 + 0.624;
                return face < chop[i] ? chop[i] : face;
            })
            return faces;
        }
    },
]);
