import { Request, Response } from "express"
import mongoose from "mongoose"
import { z } from "zod"
import Layout from "../models/layoutModel"

const locationSchema = z.object({
    long: z.number(),
    lat: z.number(),
})

const layoutSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    location: locationSchema,
})

export const createLayout = async (req: Request, res: Response) => {
    try {
        const parsedData = layoutSchema.safeParse(req.body)

        if (!parsedData.success) {
            return res.status(500).json({ error: "Bad Request" })
        }

        const layout = await Layout.create(parsedData.data)
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
    const layout = await Layout.findOne({ _id: id })
    return res.status(200).json(layout)
}
export const deleteLayout = async (req: Request, res: Response) => {
    const { id } = req.params
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
