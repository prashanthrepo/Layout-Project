import mongoose, { Document, Schema, Types } from "mongoose"
import slugify from "slugify"
import { Approval } from "./approvalModel"
import { coordinateSchema, Location, locationSchema } from "./layoutModel"



export interface Apartment extends Document {
    name: string
    description: string
    image?: string
    location: Location
    coordinates: [Location]
    approvals: Approval[]
    slug: string
    user: Types.ObjectId
}



const apartmentSchema = new Schema<Apartment>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        location: { type: locationSchema, required: true },
        coordinates: [{ type: coordinateSchema, required: true }],        
        image: { type: String, required: true },
        approvals: [{ type: String, ref:"Approval" }],
        slug: { type: String, unique: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    },
    { timestamps: true }
)


apartmentSchema.pre("save", function (next) {
    const uniqueIdentifier = Date.now().toString()
    this.slug = slugify(`${this.name}-${uniqueIdentifier}`, { lower: true })
    next()
})

export default mongoose.model("Apartment", apartmentSchema)
