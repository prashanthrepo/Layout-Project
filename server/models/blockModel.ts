import mongoose, { Document, Schema } from "mongoose";
import { Apartment } from "./apartmentModel";

export interface Block extends Document {
  blockName: string;
  apartment: Apartment;
}

const blockSchema = new Schema<Block>(
  {
    blockName: { type: String, required: true },
    apartment: { type: String, ref: "Apartment" },
  }
);

export default mongoose.model("Block", blockSchema);
