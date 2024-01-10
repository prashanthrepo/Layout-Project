import { Request, Response } from "express"
import mongoose, { Types } from "mongoose"
import leadModel from "../models/leadModel"
import siteModel from "../models/siteModel"
import token from "../models/token"
import { Transaction } from "../models/transaction"
import { logTransaction } from "./transactionController"

const getSingleSite = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }
    const site = await siteModel.findOne({ _id: id }).select("-leads")
    if (!site) {
        return res.status(404).json({ error: "no such site" })
    }
    return res.status(200).json(site)
}

const updateSite = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }

    const site = await siteModel.findOne({ _id: id })
    let prevStatus

    if ("status" in req.body) {
        prevStatus = site?.status
        if (req.body.status === "Token") {
            if ("token" in req.body) {
                let lead

                if ("lead" in req.body) {
                    lead = await createLead({
                        ...req.body.lead,
                        siteId: site?._id,
                    })
                }

                const tokenId = await createToken({
                    lead,
                    ...req.body.token,
                    site: id,
                })

                req.body.statusMetadata.token = tokenId
            }
        } else if (req.body.status === "Sold") {
            if ("lead" in req.body) {
                const leadId = await createLead({
                    ...req.body.lead,
                    siteId: id,
                })

                req.body.statusMetadata.lead = leadId
            }
        }
    }

    const siteUpdateData = { ...req.body }

    const updatedSite = await siteModel.findByIdAndUpdate(
        site?._id,
        siteUpdateData,
        {
            new: true,
        }
    )

    if ("status" in req.body) {
        await logTransaction(
            updatedSite?._id as Types.ObjectId,
            "STATUS_CHANGE",
            {
                prevStatus,
                currentStatus: updatedSite?.status,
            }
        )
    }

    return res.status(200).json({ updatedSite })
}

const getSiteLeads = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }

    const site = await siteModel.findById(id).populate("leads")
    if (site) {
        const leads = site?.leads
        return res.status(200).json({ leads })
    } else {
        return res.status(404).json({ error: "No site found" })
    }
}

const getSiteTransactions = async (req: Request, res: Response) => {
    const { id } = req.params

    let txnsResponse = []

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such site" })
    }

    const site = await siteModel.findById(id).populate("transactions")
    if (site) {
        for (const txn of site.transactions) {
            if (isTransaction(txn)) {
                const tokenId = txn.metadata?.token

                if (tokenId) {
                    const tokenObj = await fetchTokenDetails(tokenId)
                    txn.metadata.token = tokenObj
                }

                txnsResponse.push(txn)
            }
        }

        return res.status(200).json(txnsResponse)
    } else {
        return res.status(404).json({ error: "No site found" })
    }
}

const fetchTokenDetails = async (tokenId: string) => {
    const tokenObj = await token.findById(tokenId).populate("lead")
    return tokenObj
}

function isTransaction(obj: any): obj is Transaction {
    return obj && obj.metadata !== undefined
}

async function createLead(leadData: any) {
    const lead = await leadModel.create({ ...leadData })
    await lead.save()
    return lead._id
}

async function createToken(tokenData1: any) {
    const { validity, ...tokenData } = tokenData1

    const currentDate = new Date()

    if (validity) {
        const expiryDate = new Date(currentDate)
        expiryDate.setDate(currentDate.getDate() + validity)
        const tokenObj = await token.create({ ...tokenData, expiryDate })

        await logTransaction(tokenObj.site as Types.ObjectId, "TOKEN_GIVEN", {
            token: tokenObj._id,
        })

        return tokenObj._id
    }
}

export { getSingleSite, getSiteLeads, getSiteTransactions, updateSite }
