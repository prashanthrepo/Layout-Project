import { Request, Response } from "express"
import mongoose from "mongoose"
import { z } from "zod"
import Layout from "../models/layoutModel"
import siteModel from "../models/siteModel"

const locationSchema = z.object({
    long: z.number(),
    lat: z.number(),
})

const infoSchema = z.object({
    text: z.string(),
    transform: z.string(),
    type: z.string(),
})

const leadSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

const siteSchema = z.object({
    type: z.string(),
    number: z.string(),
    status: z.string(),
    points: z.string(),
    info: z.array(infoSchema),
    customPrice: z.string().optional(),
    defaultPrice: z.string().optional(),
    leads: z.array(leadSchema).optional(),
    dimensions: z.string().optional(),
    area: z.string().optional(),
})
const layoutSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    location: locationSchema,
    layoutJSON: z.array(siteSchema),
})

export const createLayout = async (req: Request, res: Response) => {
    try {
        const parsedData = layoutSchema.safeParse(req.body)

        if (!parsedData.success) {
            return res.status(500).json({ error: "Bad Request" })
        }

        const { name, description, image, location, layoutJSON } =
            parsedData.data

        const layout = await Layout.create({
            name,
            description,
            image,
            location,
        })

        layoutJSON.forEach(async siteData => {
            const site = new siteModel({ ...siteData, layout: layout._id })
            await site.save()
        })

        return res.status(201).json(layout)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getLayouts = async (req: Request, res: Response) => {
    const layouts = await Layout.find({})
    return res.status(200).json(layouts)
}

export const getSingleLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such layout" })
    }
    const layout = await Layout.findOne({ _id: id })
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
    if (!layout) {
        return res.status(404).json({ error: "no such layout" })
    }

    return res.status(200).json({ layout })
}
