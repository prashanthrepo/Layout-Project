import { Request, Response } from "express"
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
