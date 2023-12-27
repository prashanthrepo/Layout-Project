import { Request, Response } from "express"
import { Types } from "mongoose"
import siteModel from "../models/siteModel"
import Transaction, {
    Transaction as TransactionType,
} from "../models/transaction"
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
        const { site: siteId } = parsedData.data

        const site = await siteModel.findById(siteId)

        const txn = await Transaction.create({ ...parsedData.data })
        await txn.save()
        site?.transactions.push(txn._id)
        await site?.save()
        // console.log({...parsedData.data})
        return res.status(200).json(txn)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getTransactions = async (req: Request, res: Response) => {
    const txns = await Transaction.find({}).populate("metadata.token", {
        model: "Token",
    })
    return res.status(200).json(txns)
}

const getSingleTransaction = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log("id ===", id)
    const txn = await Transaction.findById(id).populate("metadata.token")

    return res.status(200).json(txn)
}

const logTransaction = async (siteId: Types.ObjectId, txnType: string) => {
    const txnData: TransactionType = {
        site: siteId,
        type: txnType,
        metadata: {},
    }

    const txn = await Transaction.create({ ...txnData })
    await txn.save()

    const site = await siteModel.findById(siteId)
    site?.transactions.push(txn._id)
    await site?.save()
}

export { createTransaction, getSingleTransaction, getTransactions }
