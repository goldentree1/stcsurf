import axios from 'axios';
import queryString from 'query-string';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

const base = "https://api.stormglass.io/v2/tide/extremes/point?";

const headers = {
    headers: {
        'Authorization': `${process.env.STORMGLASS_API_KEY}`
    }
};

function getTzMidnight(timeZone) {
    const timeZoneMidnight = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd 00:00:00');
    const from = new Date(zonedTimeToUtc(timeZoneMidnight, timeZone))
    return from;
}

function makeQueryString(lat, lon, start) {

    const end = new Date(start.getTime() + 1000 * 60 * 60 * 24 * 7);

    return base + queryString.stringify({
        lat,
        lng: lon,
        start: start.toJSON(),
        end: end.toJSON()
    })
}

export async function getStormglassTideByLocation(location, date) {
    const { metserviceCoordinates: { lat, lon }, timeZone } = location;
    const midnight = getTzMidnight(timeZone);
    const query = makeQueryString(lat, lon, midnight);
    const stormglassTideData = await axios.get(query, headers);
    return stormglassTideData.data;
}
