import mongoose, { Schema, Types } from "mongoose"

export let TRANSACTION_TYPES = ["TOKEN_GIVEN", "STATUS_CHANGE"]

type StatusChangeMetadataType = {
    prevStatus: string
    currentStatus: string
}
type TokenGivenMetadataType = {
    token: string
}

export interface Transaction {
    site: Types.ObjectId
    type: string
    date?: Date
    metadata: Object
}

const transactionSchema = new Schema<Transaction & Document>({
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
    type: { type: String, required: true, enum: TRANSACTION_TYPES },
    date: { type: Date, required: false, default: Date.now() },
    metadata: {
        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
        },
        prevStatus: { type: String, required: false },
        currentStatus: { type: String, required: false },
    },
})

export default mongoose.model("Transaction", transactionSchema)
