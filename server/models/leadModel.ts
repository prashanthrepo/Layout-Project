import mongoose, { Document, Schema } from "mongoose"

export interface LeadDocument extends Document {
    name: string
    phone: string
    email?: string
    buyerOffer?: number
    sellerOffer?: number
    finalPrice?: number
    notes?: string
    status?: string
}

const leadSchema = new Schema<LeadDocument>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: false },
        buyerOffer: { type: Number, required: false },
        sellerOffer: { type: Number, required: false },
        finalPrice: { type: Number, required: false },
        notes: { type: String, required: false },
        status: { type: String, required: false },
    },
    { timestamps: true }
)

export default mongoose.model("Lead", leadSchema)
