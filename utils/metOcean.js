import axios from 'axios';
import queryString from 'query-string';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

const headers = {
    headers: {
        'x-api-key': `${process.env.METOCEAN_API_KEY}`
    }
};

const variablesMap = {
    chop: "wave.height",
    direction: "wave.direction.peak",
    period: "wave.period.peak",
    swell: "wave.height.above-8s",
    wind10m: "wind.speed.at-10m",
    windGust10m: "wind.speed.gust.at-10m",
    windDir10m: "wind.direction.at-10m",
};

export async function getMetOceanDataByLocation(location) {
    const { metserviceCoordinates: { lat, lon }, timeZone } = location;
    const query = makeMetOceanQueryString(lat, lon, Object.values(variablesMap), timeZone);
    const metOceanData = await axios.get(query, headers);
    const data = filterMetOceanData(metOceanData, variablesMap);
    return data;
};

function makeMetOceanQueryString(lat, lon, variables, timeZone) {

    //Start of timeZone's current day (i.e., 00:00)
    const tzMostRecentMidnight = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd 00:00:00XXX')
    const from = zonedTimeToUtc(tzMostRecentMidnight, timeZone);

    //Generate query string
    const query = `${process.env.METOCEAN_URL}${queryString.stringify({
        lat,
        lon,
        variables: variables.toString(),
        interval: '3h',
        repeat: 56, //Note - this can go to 80!! i.e., 10 day forecast! should do it...
        from: from.toJSON()
    })}`;
    return query;
};

function filterMetOceanData(input, map) {
    const output = {};
    const keys = Object.keys(map);
    keys.forEach((key) => {
        output[key] = input.data.variables[map[key]].data;
    });
    output.time = input.data.dimensions.time;
    return output;
};
