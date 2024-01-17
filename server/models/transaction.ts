import mongoose, { Schema, Types } from "mongoose"

export let TRANSACTION_TYPES = ["TOKEN_GIVEN", "STATUS_CHANGE"]

export type StatusChangeMetadataType = {
    prevStatus: string
    currentStatus: string
}
export type TokenGivenMetadataType = {
    token: string
}

export interface TransactionDocument extends Document {
    site: Types.ObjectId
    type: string
    date?: Date
    metadata: Record<string, any>
}

const transactionSchema = new Schema<TransactionDocument>({
    site: { type: mongoose.Schema.Types.ObjectId, ref: "Site", index: true },
    type: { type: String, required: true, enum: TRANSACTION_TYPES },
    date: { type: Date, required: true, default: Date.now(), index: true },
    metadata: {
        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
        },
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
        },
        prevStatus: { type: String, required: false },
        currentStatus: { type: String, required: false },
        soldDate: { type: Date, required: false },
    },
})

export default mongoose.model("Transaction", transactionSchema)
