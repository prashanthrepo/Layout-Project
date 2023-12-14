import mongoose, { Document, Schema, Types } from "mongoose"
import { Layout } from "./layoutModel"

interface SiteInfo extends Document {
    text: string
    transform: string
    type: string
}

interface Lead extends Document {
    // id: string
    name: string
    phone: string
    email: string
}

interface Site extends Document {
    layout: Types.ObjectId | Layout
    number: string
    status: string
    points: string
    info: [SiteInfo]
    customPrice: string
    defaultPrice: string
    leads: [Lead]
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

const siteSchema = new Schema<Site>({
    layout: { type: Schema.Types.ObjectId, ref: "Layout", required: true },
    number: { type: String, required: true },
    status: { type: String, required: true },
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
    leads: [{ type: leadSchema }],
})

const siteModel = mongoose.model("Site", siteSchema)

export default siteModel
