import { Request, Response } from "express"
import { Types } from "mongoose"
import Lead from "../models/leadModel"
import Site from "../models/siteModel"
import { leadSchema } from "../zod/schemas"
import LayoutModel from "../models/layoutModel"

const createLead = async (req: Request, res: Response) => {
    const parsedData = leadSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(500).json({ error: "Bad Request" })
    }

    const { layoutId, siteId, ...leadData } = parsedData.data
    const lead = await Lead.create({ ...leadData })
    await lead.save()

    if (siteId) {
        const site = await Site.findOne({ _id: siteId })
        site?.leads.push(lead._id)
        await site?.save()
        return res.status(200).json({ lead })
    }
    if (layoutId) {
        const layout = await LayoutModel.findOne({ _id: layoutId })
        layout?.leads.push(lead._id)
        await layout?.save()
        return res.status(200).json({ lead })
    }
}

const deleteLead = async (req: Request, res: Response) => {
    const { id } = req.params
    await Lead.findOneAndDelete({ _id: id })
    return res.status(200).json({})
}

const updateLead = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such lead." })
    }

    const lead = await Lead.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    )
    await lead?.save()
    if (!lead) {
        return res.status(404).json({ error: "no such lead.." })
    }

    return res.status(200).json({ lead })
}

export { createLead, deleteLead, updateLead }
