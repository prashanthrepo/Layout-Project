import mongoose, { Schema, Types } from "mongoose";

export let TRANSACTION_TYPES = ["TOKEN_GIVEN", "STATUS_CHANGE"];

export type StatusChangeMetadataType = {
  prevStatus: string;
  currentStatus: string;
};
export type TokenGivenMetadataType = {
  token: string;
};

export interface FlatTransactionDocument extends Document {
  flat: Types.ObjectId;
  floor: Types.ObjectId;
  block: Types.ObjectId;
  apartment: Types.ObjectId;
  type: string;
  date?: Date;
  metadata: Record<string, any>;
}

const transactionSchema = new Schema<FlatTransactionDocument>({
  flat: { type: mongoose.Schema.Types.ObjectId, ref: "Flat", index: true },
  floor: { type: mongoose.Schema.Types.ObjectId, ref: "Floor", index: true },
  block: { type: mongoose.Schema.Types.ObjectId, ref: "Block", index: true },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    index: true,
  },
  type: { type: String, required: true, enum: TRANSACTION_TYPES },
  date: { type: Date, required: true, default: Date.now(), index: true },
  metadata: {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    prevStatus: { type: String, required: false },
    currentStatus: { type: String, required: false },
    soldDate: { type: Date, required: false },
  },
});

export default mongoose.model("FlatTransaction", transactionSchema);
