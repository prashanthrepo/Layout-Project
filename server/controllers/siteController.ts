import { Request, Response } from "express"
import mongoose from "mongoose"
import siteModel from "../models/siteModel"

const getSingleSite = async (req: Request, res: Response) => {
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

const updateSite = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }

    const site = await siteModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    )
    if (!site) {
        return res.status(404).json({ error: "no such site" })
    }

    return res.status(200).json({ site })
}

const getSiteLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }

    const site = await siteModel.findById(id).populate("leads")
    if (site) {
        const leads = site?.leads
        return res.status(200).json({ leads })
    } else {
        return res.status(404).json({ error: "No site found" })
    }
}

export { getSingleSite, getSiteLeads, updateSite }
