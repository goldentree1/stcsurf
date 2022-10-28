import axios from 'axios';
import queryString from 'query-string';

const metOceanHeaders = {
    headers: {
        'x-api-key': `${process.env.METOCEAN_API_KEY}`
    }
};

const metOceanVariablesMap = {
    chop: "wave.height",
    direction: "wave.direction.peak",
    period: "wave.period.peak",
    swell: "wave.height.above-8s",
    wind10m: "wind.speed.at-10m",
    windGust10m: "wind.speed.gust.at-10m",
    windDir10m: "wind.direction.at-10m",
};

export async function getMetOceanData(lat, lon) {
    const url = metOceanQuery(lat, lon, Object.values(metOceanVariablesMap));
    const metOceanData = await axios.get(url, metOceanHeaders);
    const data = filterMetOceanData(metOceanVariablesMap, metOceanData);
    return data; 
};

function metOceanQuery(lat, lon, variables) {
    const from = new Date(); 
    //CAN USE INTL instead... find time by timeZone, then subtract those hours to get time 0.
    from.setHours(0, 0, 0, 0); //IMPORTANT: //Will have to set TZ in Netlify if using 'setHours()' due to different timezones....
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

function filterMetOceanData(map, input) {
    const output = {};
    const keys = Object.keys(map);
    keys.forEach((key) => {
        output[key] = input.data.variables[map[key]].data;
    });
    output.time = input.data.dimensions.time;
    return output;
};

