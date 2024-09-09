import mongoose, { Document, Schema } from "mongoose";
import { Block } from "./blockModel";

export interface Floor extends Document {
  floorName: string;
  block: Block;
}

const floorSchema = new Schema<Floor>({
  floorName: { type: String, required: true },
  block: { type: String, ref: "Block" },
});

export default mongoose.model("Floor", floorSchema);
