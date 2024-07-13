import { Document, Schema, model } from "mongoose"
import { Layout } from "./layoutModel"



export interface Approval extends Document {
    name?: string
    type?: string
    description?: string
    
   
}

const approvalSchema = new Schema<Approval>(
    {
        name: { type: String, required: false, default: null },
        type: { type: String, required: false, default: null },
        description: { type: String, required: false, default: null },

    },
    { timestamps: true }
)


const ApprovalModel = model<Approval>("Approval", approvalSchema)





interface LayoutApproval extends Document {
    layout: Layout["_id"];
    approval: Approval["_id"];
    value?: string;
    displayInUI?: boolean;
    isApproved?: boolean;
}

const layoutApprovalSchema = new Schema<LayoutApproval>(
    {
        layout: { type: Schema.Types.ObjectId, ref: "Layout", required: true },
        approval: { type: Schema.Types.ObjectId, ref: "Approval", required: true },
        value: { type: String, required: false },
        displayInUI: { type: Boolean, required: false,default:false },
        isApproved: { type: Boolean, required: false,default:false },
    },
    { timestamps: true }
);

const LayoutApprovalModel = model<LayoutApproval>("LayoutApproval", layoutApprovalSchema);



export { ApprovalModel,LayoutApprovalModel}