import { Types } from "mongoose"
import siteModel from "../models/siteModel"
import Transaction, {
    Transaction as TransactionType,
} from "../models/transaction"


const logTransaction = async (
    siteId: Types.ObjectId,
    txnType: string,
    metadata: Object
) => {
    const txnData: TransactionType = {
        site: siteId,
        type: txnType,
        metadata,
        date: new Date()
    }

    const txn = await Transaction.create(txnData)
    await txn.save()
    const site = await siteModel.findById(siteId)
    site?.transactions.push(txn._id)
    await site?.save()
}

export {
    logTransaction
}

