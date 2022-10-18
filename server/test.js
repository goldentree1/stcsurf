exports.handler = async function(event, context){
    //event and context are provided by netlify.
    //handler receives event object... context is other context in which function is called.
    return{
        statusCode: 200,
        body: JSON.stringify({message:"HELLO WORLD from netlify serverless function!"})
    }
}