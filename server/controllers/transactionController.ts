import { Request, Response } from "express"
import Transaction from "../models/transaction"
import { transactionSchema } from "../zod/schemas"

const createTransaction = async (req: Request, res: Response) => {
    const parsedData = transactionSchema.safeParse(req.body)
    // console.log("123 ===",123)
    // console.log("parsedData ===",parsedData)

    if (!parsedData.success) {
        return res.status(500).json(parsedData.error)

        // console.log("parsedData.data ===",parsedData.data)
    }

    try {
        const txn = await Transaction.create({ ...parsedData.data })
        await txn.save()
        // console.log({...parsedData.data})
        return res.status(200).json(txn)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { createTransaction }
