import { getForecast } from "../../utils/forecast";

export default async function getData(req, res){
    try{
        const {id, date} = req.body;
        const forecast = await getForecast(id, date);
        res.status(200).json(forecast);
    }catch(err){
        res.status(500).json({err});
    }
}