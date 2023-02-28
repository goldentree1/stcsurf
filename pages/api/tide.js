import { getTide } from "utils/tide";
export default async function getData(req, res){
    try{
        const {id, date} = req.body;
        const tide = await getTide(id, date);
        res.status(200).json(tide);
    }catch(err){
        res.status(500).json({err});
    }
}
