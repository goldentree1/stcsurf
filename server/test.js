import { formatInTimeZone, getTimezoneOffset, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
export const handler = async (event, context) => {
    const timeZone = "Pacific/Auckland"; //get timeZone
    const date = new Date(); //get current UTC
    //Gets the nearest midnight for the specific timezone
    const tzMostRecentMidnight = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd 00:00:00XXX')
    const utc = zonedTimeToUtc(tzMostRecentMidnight, timeZone)   //WORKING - returns 0 hour of the timezone...
                                                        // so now we can give 'metocean' an accurate 'from' date no matter the location!
    //1. get current time in NZT
    //2. take date of current time - and set it to 0:00:00
    //3. Convert that to utc.

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "HI!",
            tzMostRecentMidnight,
            utc,
            utcLocalised: utc.toLocaleDateString()+" " +utc.toLocaleTimeString(),
            currentUTC: new Date()
        })
    }
}