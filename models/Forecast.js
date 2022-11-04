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
    data:{}
});

export const Forecast = models.Forecast || model("Forecast", forecastSchema);

export const forecastVirtuals = new Virtuals([
    {
        name: "data.face",
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
