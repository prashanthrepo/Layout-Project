import mongoose, { Document, Schema } from "mongoose";
import floorModel, { Floor } from "./floorModel";
import { SiteInfo, siteInfoSchema } from "./siteModel";

export interface Flat extends Document {
  flatName: string;
  points: string;
  status: string;
  floor: Floor;
  info: [SiteInfo];
}

const flatSchema = new Schema<Flat>({
  flatName: { type: String, required: true },
  points: { type: String, required: true },
  floor: { type:  Schema.Types.ObjectId, ref: "Floor" },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Token", "Sold", "Blocked"],
  },
  info: [
    {
        type: siteInfoSchema,
    },
],
});

export default mongoose.model("Flat", flatSchema);
