import { Request, Response } from "express"
import mongoose from "mongoose"
import siteModel from "../models/siteModel"

export const getSingleSite = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }
    const site = await siteModel.findOne({ _id: id })
    if (!site) {
        return res.status(404).json({ error: "no such site" })
    }
    return res.status(200).json(site)
}
