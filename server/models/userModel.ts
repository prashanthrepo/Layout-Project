import { Document, Schema, model,Model } from "mongoose"

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

interface UserModelStatic extends Model<User> {
    getUserRoleById(userId: string): Promise<UserRole | null>
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


userSchema.statics.getUserRoleById = async function (userId: string): Promise<UserRole | null> {
    try {
        const user = await this.findById(userId)
        return user ? user.role : null
    } catch (error) {
        console.error("Error retrieving user role:", error)
        return null
    }
}

const UserModel = model<User,UserModelStatic>("User", userSchema)

export default UserModel


