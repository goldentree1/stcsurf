export const handler = async (event, context) => {
    const date = new Date();
    const options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'Pacific/Auckland',
        // timeZone: 'Australia/Sydney',
        timeZoneName: 'short'
    };
    const d = new Intl.DateTimeFormat('en-AU', options).format(date)
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "HI!",
            d
        })
    }
}