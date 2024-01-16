import { Types } from "mongoose"
import siteModel from "../models/siteModel"
import transaction from "../models/transaction"


const logTransaction = async (
    siteId: Types.ObjectId,
    txnType: string,
    metadata: Object
) => {
    const txnData = {
        site: siteId,
        type: txnType,
        metadata,
        date: new Date()
    }

    const txn = await transaction.create(txnData)
    await txn.save()
    const site = await siteModel.findById(siteId)
    site?.transactions.push(txn._id)
    await site?.save()
}

export {
    logTransaction
}

