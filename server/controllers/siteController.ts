import { Request, Response } from "express"
import mongoose from "mongoose"
import siteModel from "../models/siteModel"
import token from "../models/token"

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

    const site = await siteModel.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    )
    if (!site) {
        return res.status(404).json({ error: "no such site" })
    }

    return res.status(200).json({ site })
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
            const tokenId = txn.metadata?.token

            if (tokenId) {
                const tokenObj = await fetchTokenDetails(tokenId)
                txn.metadata.token = tokenObj
            }

            txnsResponse.push(txn)
        }

        

        return res.status(200).json(txnsResponse)
    } else {
        return res.status(404).json({ error: "No site found" })
    }
}

const fetchTokenDetails = async (tokenId: string) => {
    const tokenObj = await token.findById(tokenId).populate("lead")
    // console.log("tokenObj ===", tokenObj)
    return tokenObj
}

export { getSingleSite, getSiteLeads, getSiteTransactions, updateSite }
