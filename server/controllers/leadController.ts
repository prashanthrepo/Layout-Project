import { Request, Response } from "express"
import { BAD_REQUEST, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config"
import LayoutModel from "../models/layoutModel"
import Lead, { LeadDocument } from "../models/leadModel"
import Site from "../models/siteModel"
import { leadSchema } from "../zod/schemas"
import layoutModel from "../models/layoutModel"
import siteModel from "../models/siteModel"

const createLead = async (req: Request, res: Response) => {

    try {

        const parsedData = leadSchema.safeParse(req.body)
        if (!parsedData.success) {
            res.sendError(BAD_REQUEST, { details: parsedData.error.issues })
        }
        else {
            const { layoutId, siteId, ...leadData } = parsedData.data
            const lead = await Lead.create(leadData)
            await lead.save()

            if (siteId) {
                const site = await Site.findOne({ _id: siteId })
                site?.leads.push(lead._id)
                await site?.save()
            }
            if (layoutId) {
                const layout = await LayoutModel.findOne({ _id: layoutId })
                layout?.leads.push(lead._id)
                await layout?.save()
            }
            res.sendSuccess(lead, 201)
        }
    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }


}


const getAllLeads = async (req: Request, res: Response) => {


    const layoutIds = await layoutModel.find({ user: req.userId }).distinct('_id');
    const sites = await siteModel.find({ layout: { $in: layoutIds } })

    const allLeads:LeadDocument[] = sites.reduce((acc:LeadDocument[] , site) => {
        acc.push(...site.leads);
        return acc;
    }, []);

    res.sendSuccess(allLeads)






}

const deleteLead = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const lead = await Lead.findOneAndDelete({ _id: id })
        lead && res.sendSuccess({}, 200)
        !lead && res.sendError(OBJECT_NOT_FOUND)
    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}



const updateLead = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const lead = await Lead.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        await lead?.save()
        !lead && res.sendError(OBJECT_NOT_FOUND)
        lead && res.sendSuccess(lead)

    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }


}

export { createLead, deleteLead, updateLead,getAllLeads }
