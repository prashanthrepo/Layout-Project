import { Types } from "mongoose"
import mongoose, { Document, Schema } from "mongoose"


export interface LeadDocument extends Document {
    contactId : Types.ObjectId
    siteId : Types.ObjectId
    buyerOffer?: number
    sellerOffer?: number
    finalPrice?: number
    notes?: string
    status?: string
}

const leadSchema = new Schema<LeadDocument>(
    {
        contactId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
        siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
        buyerOffer: { type: Number, required: false },
        sellerOffer: { type: Number, required: false },
        finalPrice: { type: Number, required: false },
        notes: { type: String, required: false },
        status: { type: String, required: false },
    },
    { timestamps: true }
)

leadSchema.pre('find', function () {
    this.populate('contactId');
  });

export default mongoose.model("Lead", leadSchema)


