import { Request, Response } from "express"
import mongoose, { Types } from "mongoose"
import {
    default as Layout,
    default as layoutModel,
} from "../models/layoutModel"
import siteModel, { Site } from "../models/siteModel"
import { layoutSchema } from "../zod/schemas"

const createLayout = async (req: Request, res: Response) => {
    try {
        const parsedData = layoutSchema.safeParse(req.body)

        if (!parsedData.success) {
            return res.status(500).json({
                error: {
                    message: "Bad Request",
                    details: parsedData.error.issues,
                },
            })
        }

        const { name, description, image, location, layoutJSON } =
            parsedData.data

        const layout = await Layout.create({
            name,
            description,
            image,
            location,
        })

        const createdSites = await Promise.all<Site["_id"]>(
            layoutJSON.map(async siteData => {
                const site = new siteModel({ ...siteData, layout: layout._id })
                await site.save()
                return site._id
            })
        )
        layout.sites = createdSites
        await layout.save()

        return res.status(201).json(layout)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getLayouts = async (req: Request, res: Response) => {
    const layouts = await Layout.find({}).select("-sites -location._id")
    return res.status(200).json(layouts)
}

const getSingleLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such layout" })
    }
    const layout = await Layout.findOne({ _id: id }).populate("sites")
    if (!layout) {
        return res.status(404).json({ error: "no such layout" })
    }
    return res.status(200).json(layout)
}
const deleteLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such layout" })
    }
    const layout = await Layout.findOneAndDelete({ _id: id })

    if (!layout) {
        return res.status(404).json({ error: "no such layout" })
    }
    return res.status(200).json(layout)
}

const updateLayout = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such layout" })
    }

    const layout = await Layout.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    )
    await layout?.save()
    if (!layout) {
        return res.status(404).json({ error: "no such layout" })
    }

    return res.status(200).json({ layout })
}

const getLayoutLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such layout" })
    }

    const layout = await Layout.findById(id).populate("leads")
    if (layout) {
        const leads = layout.leads
        return res.status(200).json({ leads })
    } else {
        return res.status(404).json({ error: "no such layout" })
    }
}

const getAllLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
    }
    const layout = await layoutModel
        .findById(id)
        .populate({
            path: "sites",
            populate: {
                path: "leads",
                model: "Lead",
            },
        })
        .populate("leads")

    let allLeads = []

    if (layout) {
        layout.sites.forEach(site => {
            allLeads = [...allLeads, ...site.leads]
        })

        allLeads = [...allLeads, ...layout?.leads]
    }

    return res.status(200).json({ allLeads })
}

export {
    createLayout,
    deleteLayout,
    getAllLeads,
    getLayoutLeads,
    getLayouts,
    getSingleLayout,
    updateLayout,
}
