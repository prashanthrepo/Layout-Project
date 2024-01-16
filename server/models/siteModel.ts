import mongoose, { Document, Schema, Types } from "mongoose"
import { Layout } from "./layoutModel"
import { Transaction } from "./transaction"

interface SiteInfo extends Document {
    text: string
    transform: string
    type: string
}

interface Lead extends Document {
    name: string
    phone: string
    email?: string
}

export interface Site extends Document {
    _id: Types.ObjectId
    layout: Types.ObjectId | Layout
    number: string
    type: string
    status: "Available" | "Token" | "Sold" | "Blocked"
    statusMetadata: Record<string, any>
    points: string
    info: [SiteInfo]
    customPrice: string
    defaultPrice: string
    leads: Lead[]
    transactions: Array<Types.ObjectId | Transaction>
    dimensions: string
    area: string
}

const siteInfoSchema = new Schema<SiteInfo>({
    text: { type: String },
    transform: { type: String },
    type: { type: String },
})

const leadSchema = new Schema<Lead>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
})

export const siteSchema = new Schema<Site>({
    layout: { type: Schema.Types.ObjectId, ref: "Layout", required: true },
    number: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true, enum: ["Available", "Token", "Sold", "Blocked"] },
    statusMetadata: {
        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
            required: false,
        },
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: false,
        },
        amount: { type: Number, required: false },
        notes: { type: String, required: false },
        soldDate: { type: String, required: false },
    },
    points: { type: String, required: true },
    customPrice: { type: String, required: false },
    defaultPrice: { type: String, required: false },
    area: { type: String, required: false },
    dimensions: { type: String, required: false },
    info: [
        {
            type: siteInfoSchema,
        },
    ],
    leads: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
    transactions: [{ type: Schema.Types.Mixed, ref: "Transaction" }],
})

const siteModel = mongoose.model("Site", siteSchema)

export default siteModel
