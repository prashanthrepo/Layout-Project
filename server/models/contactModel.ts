import { Document, Schema, Types, model } from "mongoose"




export interface Contact extends Document {
    name: string
    phone: string
    email?: string
    user: Types.ObjectId

    
   
}



const contactSchema = new Schema<Contact>(
    {
      
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: false },
        user: { type: Schema.Types.ObjectId, ref: "User", required: false },

    },
    { timestamps: true }
)


const ContactModel = model<Contact>("Contact", contactSchema)

export default ContactModel





