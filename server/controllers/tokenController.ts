import { Request, Response } from "express"
import { tokenSchema } from "../zod/schemas"

import Token from "../models/token"

const createToken = async (req: Request, res: Response) => {
    const parsedData = tokenSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(500).json({ error: parsedData.error })
    }

    const token = await Token.create({ ...parsedData.data })
    console.log("token ===", token)
    return res.status(201).json(token)
}

export { createToken }
