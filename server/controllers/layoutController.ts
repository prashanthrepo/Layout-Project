import { Request, Response } from "express"
import mongoose from "mongoose"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OBJECT_NOT_FOUND } from "../config"
import { default as Layout } from "../models/layoutModel"
import siteModel, { Site } from "../models/siteModel"
import { layoutSchema } from "../zod/schemas"

const createLayout = async (req: Request, res: Response) => {
    try {
        const parsedData = layoutSchema.safeParse(req.body)

        if (!parsedData.success) {
            res.sendError(BAD_REQUEST, { details: parsedData.error.issues })
        }
        else {
            const layout = await Layout.create({ ...parsedData.data, })
            const createdSites = await Promise.all<Site["_id"]>(
                parsedData.data.layoutJSON.map(async siteData => {
                    const site = new siteModel({ ...siteData, layout: layout._id })
                    await site.save()
                    return site._id
                })
            )
            layout.sites = createdSites
            await layout.save()
            res.sendSuccess(layout, 201)

        }
    } catch (error) {
        res.sendError(INTERNAL_SERVER_ERROR, { error })
    }
}

const getLayouts = async (req: Request, res: Response) => {
    const layouts = await Layout.find({})
        .select("-sites -location._id")
        .sort({ createdAt: -1 })
    res.sendSuccess(layouts)

}

const getSingleLayout = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {

            res.sendError(OBJECT_NOT_FOUND)
            return
        }
        const layout = await Layout.findOne({ _id: id }).populate("sites")
        !layout && res.sendError(OBJECT_NOT_FOUND)
        layout && res.sendSuccess(layout)

    } catch (error) {
        res.sendError(INTERNAL_SERVER_ERROR, { error })
    }

}

const deleteLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError(OBJECT_NOT_FOUND)
        return
    }
    const layout = await Layout.findOneAndDelete({ _id: id })
    !layout && res.sendError(OBJECT_NOT_FOUND)
    res.sendSuccess({}, 200)

}

const updateLayout = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError(OBJECT_NOT_FOUND)
        return
    }

    try {
        const layout = await Layout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        await layout?.save()
        if (!layout) {
            res.sendError(OBJECT_NOT_FOUND)
        }
        res.sendSuccess(layout)
    } catch (error) {
        res.sendError(INTERNAL_SERVER_ERROR, { error })
    }

}

const getLayoutLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError(OBJECT_NOT_FOUND)
        return
    }

    const layout = await Layout.findById(id).populate({
        path: "leads",
        options: { sort: { createdAt: -1 } },
    })
    if (layout) {
        const leads = layout.leads
        res.sendSuccess(leads)
    } else {
        res.sendError(OBJECT_NOT_FOUND)
    }
}



export {
    createLayout,
    deleteLayout,
    getLayoutLeads,
    getLayouts,
    getSingleLayout,
    updateLayout
}

