import { Request, Response } from "express"
import mongoose from "mongoose"
import Layout from "../models/layoutModel"
import siteModel, { Site } from "../models/siteModel"
import { layoutSchema } from "../zod/schemas"

export const createLayout = async (req: Request, res: Response) => {
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

export const getLayouts = async (req: Request, res: Response) => {
    const layouts = await Layout.find({}).select("-sites -location._id")
    return res.status(200).json(layouts)
}

export const getSingleLayout = async (req: Request, res: Response) => {
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
export const deleteLayout = async (req: Request, res: Response) => {
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

export const updateLayout = async (req: Request, res: Response) => {
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
