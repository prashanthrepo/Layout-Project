import { Request, Response } from "express"
import { BAD_REQUEST, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config"
import layoutModel, { default as Layout } from "../models/layoutModel"
import siteModel, { Site } from "../models/siteModel"
import { TransactionDocument } from "../models/transaction"
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
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}

const getLayouts = async (req: Request, res: Response) => {

    try {

        const layouts = await Layout.find({ user: req.userId })
            .select("-sites -location._id")
            .sort({ createdAt: -1 })
        res.sendSuccess(layouts)
    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })

    }

}

const getSingleLayout = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
        const layout = await Layout.findOne({ _id: id }).populate("sites")
        !layout && res.sendError(OBJECT_NOT_FOUND)
        layout && res.sendSuccess(layout)

    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }

}

const deleteLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const layout = await Layout.findOneAndDelete({ _id: id })
        !layout && res.sendError(OBJECT_NOT_FOUND)
        layout && res.sendSuccess({}, 200)

    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}

const updateLayout = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const layout = await Layout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        await layout?.save()
        !layout && res.sendError(OBJECT_NOT_FOUND)
        layout && res.sendSuccess(layout)
    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }

}

const getLayoutLeads = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
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
    } catch (error) { res.sendError(SOMETHING_WENT_WRONG, { error }) }
}


// const getLayoutTransactions = async (req: Request, res: Response) => {

//     let txns = []

//     const { id } = req.params

//     const layout = await layoutModel.findById(id).populate("sites")
//     if (layout) {

//         txns = layout.sites.map(async (site) => {

//             const siteTxns = await transaction.find({ site })
//             return siteTxns



//         })

//         console.log("txns ===", txns)

//         res.sendSuccess()







//     }






// }


const getLayoutTransactions = async (req: Request, res: Response) => {
    try {
        const { id, date } = req.params;
        // TODO: Add option to filter by date

        const layout = await layoutModel.findById(id).populate("sites");

        if (layout) {

            const sitePromises = layout.sites.map(async (site) => {
                const siteObj = await siteModel.findById(site).populate("transactions")
                // const siteObj = await siteModel.findById(site).populate({
                //     path: "transactions",
                //     options: { sort: { date: -1 } }
                // })
                return siteObj?.transactions
            });


            const resolvedSiteTxns = await Promise.all(sitePromises) as Array<TransactionDocument>[];
            const allTxns = resolvedSiteTxns.flat()
            const sortedTxns = allTxns.sort((a, b) => {
                if (a.date && b.date) {
                    return b.date.getTime() - a.date.getTime();
                }
                return 0;
            })
            res.sendSuccess(sortedTxns);
        }
    } catch (error) {
        console.error("Error in getLayoutTransactions:", error);
        res.sendError(SOMETHING_WENT_WRONG);
    }
};


export {
    createLayout, deleteLayout,
    getLayoutLeads, getLayoutTransactions, getLayouts,
    getSingleLayout, updateLayout
}

