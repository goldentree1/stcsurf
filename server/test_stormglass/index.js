import axios from 'axios';
import queryString from 'query-string';
import fs from 'fs';

export const handler = async function (e, c) {
    const headers = {
        'Authorization': 'afeb6e12-cd2d-11ec-9c2a-0242ac130002-afeb6ea8-cd2d-11ec-9c2a-0242ac130002'
    }
    //OG CO-ORDS (met-O)
    // const lat = -45.99;
    // const lng = 170.51;

    //2 - this was rejected by some forecasts..:
    // const lat = -45.921055
    // const lng =  170.502148

    // -45.921817, 170.517593

    //#3
    const lat = -45.922;
    const lng = 170.518;

    const params = [
        'swellDirection',
        'swellHeight',
        'swellPeriod',
        'secondarySwellPeriod',
        'secondarySwellDirection',
        'secondarySwellHeight',
        'waveDirection',
        'waveHeight',
        'wavePeriod',
        'windWaveDirection',
        'windWaveHeight',
        'windWavePeriod',
        'windDirection',
        'windDirection20m',
        'windDirection30m',
        'windDirection40m',
        'windDirection50m',
        'windDirection80m',
        'windDirection100m',
        'windSpeed',
        'windSpeed20m',
        'windSpeed30m',
        'windSpeed40m',
        'windSpeed50m',
        'windSpeed80m',
        'windSpeed100m'
    ]
    const paramsString = params.reduce((accumulation, currentValue, currentIndex) => {
        const separator = currentIndex >= params.length - 1 ? "" : ","
        return accumulation + currentValue + separator;
    }, "");
    const query = `https://api.stormglass.io/v2/weather/point?${queryString.stringify({
        lat,
        lng,
    })}&params=${paramsString}`

    //Working... but stormglass surf forecast
    //is absolute shit for NZ. Unuse-able.
    // try{
    //     const data = await axios.get(query, { headers })
    //     console.log(JSON.stringify(data.data));
    //     const d = JSON.stringify(data.data);
    //     fs.writeFileSync("./data.json", d);
    //     return {
    //         statusCode: 200,
    //         data: JSON.stringify(data.data),
    //     }
    // }catch(err){
    //     console.error(err);
    // }


//--------------TIDES--------------
// (working! and accurate! ... but...)

    //This will face the exact same errors as 
    //metOcean start dates - see utils/metOcean.js 
    const start = new Date().setHours(0,0,0,0);

    //Apart from that, works well.
    const tidesQuery = `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${start}`;
    try{

        const data = await axios.get(tidesQuery, { headers })
        console.log({...data.data});
        const json = JSON.stringify({...data.data});
        fs.writeFileSync("./tidesdata_test1.json", json);
        return {
            statusCode: 200,
            data: JSON.stringify({...data.data}),
        }
    }catch(err){
        console.error(err);
    }

    return {
        statusCode: 200,
    }
};


//Read saved JSON data.
// const stormglassData = fs.readFileSync("./stormglass_data.json", { encoding: 'utf-8' })
// function readData(stormglassJSON) {
//     const data = JSON.parse(stormglassJSON);
//     console.log(data.hours[12])
// }
// readData(stormglassData);