import mongoose, { Document, Schema, Types } from "mongoose"
import slugify from "slugify"
import { Approval } from "./approvalModel"

interface Location {
    lat: number
    long: number
}

export interface Layout extends Document {
    name: string
    description: string
    image?: string
    location: Location
    coordinates: [Location]
    sites: Types.ObjectId[]
    leads: Types.ObjectId[]
    approvals: Approval[]
    slug: string
    user: Types.ObjectId
}

const locationSchema = new Schema<Location>({
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
})
const coordinateSchema = new Schema<Location>({
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
})



const layoutSchema = new Schema<Layout>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        location: { type: locationSchema, required: true },
        coordinates: [{ type: coordinateSchema, required: true }],        
        image: { type: String, required: true },
        sites: [{ type: Schema.Types.ObjectId, ref: "Site" }],
        leads: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
        approvals: [{ type: String, ref:"Approval" }],
        slug: { type: String, unique: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    },
    { timestamps: true }
)

layoutSchema.pre("save", function (next) {
    const uniqueIdentifier = Date.now().toString()
    this.slug = slugify(`${this.name}-${uniqueIdentifier}`, { lower: true })
    next()
})

export default mongoose.model("Layout", layoutSchema)
