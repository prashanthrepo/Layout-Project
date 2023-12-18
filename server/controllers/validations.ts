import { Types,Model } from "mongoose"





export const isValidId = (id:Types.ObjectId|string, model:string ) =>

{


    if (!Types.ObjectId.isValid(id) || [model].find({_id:id})) {
        // return res.status(404).json({ error: "no such layout" })
    }

    
   
}