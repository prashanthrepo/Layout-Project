import { Request, Response } from "express"
import mongoose from "mongoose"
import { default as Layout } from "../models/layoutModel"
import siteModel, { Site } from "../models/siteModel"
import { layoutSchema } from "../zod/schemas"

const createLayout = async (req: Request, res: Response) => {
    try {
        const parsedData = layoutSchema.safeParse(req.body)

        if (!parsedData.success) {
            res.sendError({ details: parsedData.error.issues }, 400, "Bad Request",)
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
        res.sendError({ error })
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

            res.sendError({ error: "Layout not found" }, 404, "Layout not found")
            return
        }
        const layout = await Layout.findOne({ _id: id }).populate("sites")
        !layout && res.sendError({ error: "Layout not found" }, 404, "Layout not found")
        layout && res.sendSuccess(layout)

    } catch (error) {
        res.sendError({ error })
    }



}



const deleteLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError({ error: "Layout not found" }, 404, "Layout not found")
        return
    }
    const layout = await Layout.findOneAndDelete({ _id: id })
    !layout && res.sendError({ error: "Layout not found" }, 404, "Layout not found")
    res.sendSuccess({}, 200)

}

const updateLayout = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError({ error: "Layout not found" }, 404, "Layout not found")
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
            res.sendError({ error: "Layout not found" }, 404, "Layout not found")
        }
        res.sendSuccess(layout)
    } catch (error) {
        res.sendError({ error })
    }

}

const getLayoutLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.sendError({ error: "Layout not found" }, 404, "Layout not found")
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
        res.sendError({ error: "Layout not found" }, 404, "Layout not found")
    }
}

// const getAllLeads = async (req: Request, res: Response) => {
//     const { id } = req.params

//     if (!Types.ObjectId.isValid(id)) {
//     }
//     const layout = await layoutModel
//         .findById(id)
//         .populate({
//             path: "sites",
//             populate: {
//                 path: "leads",
//                 model: "Lead",
//             },
//         })
//         .populate("leads")

//     let allLeads = []

//     if (layout) {
//         layout.sites.forEach(site => {
//             allLeads = [...allLeads, ...site.leads]
//         })

//         allLeads = [...allLeads, ...layout?.leads]
//     }

//     return res.status(200).json({ allLeads })
// }

export {
    createLayout,
    deleteLayout,
    // getAllLeads,
    getLayoutLeads,
    getLayouts,
    getSingleLayout,
    updateLayout
}

