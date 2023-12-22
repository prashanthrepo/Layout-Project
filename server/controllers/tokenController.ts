import { Request, Response } from "express"
import token from "../models/token"
import { tokenSchema } from "../zod/schemas"

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
        console.log("tokenObj ===",tokenObj)
        
        
        res.status(201).json(tokenObj)
    }
}

export { createToken }
