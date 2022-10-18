export function getAllLocationIDs(){
    return[
        { params: { id: 'aramoana-spit' } },
        { params: { id: 'st-clair' } }
    ]
} 

export function getForecast(id, date = new Date()){    
    //fetch forecast from db

    //return data for build
    return{
        data:{
            swellHeight: 3.2,
            swellPeriod: 2.1,
            face: 4.5
        }
    }
}

export function getLocation(id){
    return{
        name:'St Clair Beach',
        lat: 45,
        lon: 46,
    }
}
