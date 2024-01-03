import { Request, Response } from "express"
import { Types } from "mongoose"
import siteModel from "../models/siteModel"
import token from "../models/token"
import { tokenSchema } from "../zod/schemas"
import { logTransaction } from "./transactionController"

const createToken = async (req: Request, res: Response) => {
    const parsedData = tokenSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(500).json({ error: parsedData.error })
    }

    const { validity, ...tokenData } = parsedData.data

    const currentDate = new Date()

    if (validity) {
        const expiryDate = new Date(currentDate)
        expiryDate.setDate(currentDate.getDate() + validity)
        const tokenObj = await token.create({ ...tokenData, expiryDate })

        res.status(201).json(tokenObj)

        await logTransaction(tokenObj.site as Types.ObjectId, "TOKEN_GIVEN", {
            token: tokenObj._id,
        })

        const { site: siteId } = tokenData
        const site = await siteModel.findById(siteId)

        if (site) {
            site.status = "Token"
            await site.save()
        }

        await logTransaction(tokenObj.site as Types.ObjectId, "STATUS_CHANGE", {
            prevStatus: "Available",
            currentStatus: "Token",
        })
    }
}

export { createToken }
