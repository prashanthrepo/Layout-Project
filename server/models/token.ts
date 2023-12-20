import mongoose, { Document, Schema, Types } from "mongoose"
import { Layout } from "./layoutModel"
import { Site } from "./siteModel"

interface Token {
    site: Types.ObjectId | Site
    lead: Types.ObjectId | Layout
    tokenAmount: number
    validity?: number
}

const tokenSchema = new Schema<Token & Document>(
    {
        site: { type: Types.ObjectId, ref: "Site", required: true },
        lead: { type: Types.ObjectId, ref: "Lead", required: true },
        tokenAmount: { type: Number, required: true },
        validity: { type: Number, required: false },
    },
    { timestamps: true }
)

export default mongoose.model("Token", tokenSchema)
