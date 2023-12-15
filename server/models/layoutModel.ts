import mongoose, { Document, Schema, Types } from "mongoose"
import slugify from "slugify"

interface Location {
    lat: number
    long: number
}

export interface Layout extends Document {
    name: string
    description: string
    image?: string
    location: Location
    sites: Types.ObjectId[]
    slug: string
}

const locationSchema = new Schema<Location>({
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
})

const layoutSchema = new Schema<Layout>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        location: { type: locationSchema, required: true },
        image: { type: String, required: true },
        sites: [{ type: Schema.Types.ObjectId, ref: "Site" }],
        slug: { type: String, unique: true },
    },
    { timestamps: true }
)

layoutSchema.pre("save", function (next) {
    const uniqueIdentifier = Date.now().toString()
    this.slug = slugify(`${this.name}-${uniqueIdentifier}`, { lower: true })
    next()
})

const LayoutModel = mongoose.model("Layout", layoutSchema)

export default LayoutModel
