import { Document, Schema, model } from "mongoose"

type UserRole = "Seller" | "Buyer" | "Admin"

interface User extends Document {
    first_name?: string
    last_name?: string
    phone_number: string
    email: string
    dob?: string
    image?: string
    otp?: string
    role: UserRole
    isVerified: boolean
}

const userSchema = new Schema<User>(
    {
        phone_number: { type: String, required: true, index: true, unique: true },
        first_name: { type: String, required: false, default: null },
        last_name: { type: String, required: false, default: null },
        email: { type: String, required: false, default: null },
        dob: { type: String, required: false, default: null },
        image: { type: String, required: false, default: null },
        otp: { type: String, required: false, default: "" },
        isVerified: { type: Boolean, required: true, default: false },
        role: {
            type: String,
            enum: ["Seller", "Buyer", "Admin"],
            required: false,
        },

    },
    { timestamps: true }
)

const UserModel = model<User>("User", userSchema)

export default UserModel


