import { Request, Response } from "express"
import { Types } from "mongoose"
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

        await logTransaction(tokenObj.site as Types.ObjectId, "TOKEN_GIVEN", {
            token: tokenObj._id,
        })

        res.status(201).json(tokenObj)
    }
}

export { createToken }
