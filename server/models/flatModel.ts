import mongoose, { Document, Schema, Types } from "mongoose";
import floorModel, { Floor } from "./floorModel";
import { Lead, SiteInfo, siteInfoSchema } from "./siteModel";
import { TransactionDocument } from "./transaction";

export interface Flat extends Document {
  flatName: string;
  points: string;
  // status: string;
  floor: Floor;
  info: [SiteInfo];

  // _id: Types.ObjectId
  // layout: Types.ObjectId | Layout;
  // number: string;
  type: string;
  status: "Available" | "Token" | "Sold" | "Blocked";
  statusMetadata: Record<string, any>;
  blockedForSelf: Boolean;
  // points: string;
  // info: [SiteInfo];
  customPrice: string;
  defaultPrice: string;
  leads: Lead[];
  transactions: Array<Types.ObjectId | TransactionDocument>;
  dimensions: string;
  area: string;
}

const flatSchema = new Schema<Flat>({
  flatName: { type: String, required: true },
  // points: { type: String, required: true },
  floor: { type: Schema.Types.ObjectId, ref: "Floor" },
  // status: {
  //   type: String,
  //   required: true,
  //   enum: ["Available", "Token", "Sold", "Blocked"],
  // },
  // info: [
  //   {
  //     type: siteInfoSchema,
  //   },
  // ],

  // ----
  // layout: { type: Schema.Types.ObjectId, ref: "Layout", required: true },
  // number: { type: String, required: true },
  type: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Token", "Sold", "Blocked"],
  },
  blockedForSelf: { type: Boolean, required: false, default: false },
  statusMetadata: {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
      required: false,
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: false,
    },
    amount: { type: Number, required: false },
    notes: { type: String, required: false },
    soldDate: { type: String, required: false },
    registrationDate: { type: String, required: false },
  },
  points: { type: String, required: true },
  customPrice: { type: String, required: false },
  defaultPrice: { type: String, required: false },
  area: { type: String, required: false },
  dimensions: { type: String, required: false },
  info: [
    {
      type: siteInfoSchema,
    },
  ],
  leads: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
  transactions: [{ type: Schema.Types.Mixed, ref: "Transaction" }],
});

export const createCustomTransactionForFlat = function (
  site: Flat,
  txn: TransactionDocument,
  layoutName?: string
) {
  let customTransaction: any = {
    siteNumber: site.number,
    layoutName,
  };

  if (layoutName) {
    customTransaction.layoutName = layoutName;
  }

  const getStatus = (metadata: any) => {
    if (
      metadata.currentStatus === "Token" ||
      metadata.currentStatus === "Sold" ||
      metadata.currentStatus === "Blocked"
    )
      return metadata.currentStatus;

    if (
      metadata.prevStatus === "Token" &&
      metadata.currentStatus === "Available"
    )
      return "Token Cancelled";

    if (
      metadata.prevStatus !== "Token" &&
      metadata.currentStatus === "Available"
    )
      return "Available";
  };

  const txnStatus = getStatus(txn.metadata);

  if (txnStatus === "Token") {
    customTransaction.type = "Token";
    customTransaction.tokenBy = txn.metadata?.token?.lead
      ? txn.metadata.token.lead.name
      : "";
    customTransaction.date = txn.metadata.token
      ? txn.metadata.token.createdAt
      : "";
  } else if (txnStatus === "Sold") {
    customTransaction.type = "Sold";
    customTransaction.soldTo = txn.metadata.lead ? txn.metadata.lead.name : "";
    customTransaction.date = txn.metadata.soldDate ? txn.metadata.soldDate : "";
  } else if (txnStatus === "Blocked") {
    customTransaction.type = "Blocked";
    customTransaction.blockedTo = txn.metadata.lead
      ? txn.metadata.lead.name
      : "";
    customTransaction.date = txn?.date ? txn.date : "";
  } else if (txnStatus === "Available") {
    customTransaction.type = "Available";
    customTransaction.date = txn.date ? txn.date.toDateString() : "";
  } else if (txnStatus === "Token Cancelled") {
    customTransaction.type = "Token Cancelled";
    customTransaction.tokenCancelledBy = txn.metadata.lead
      ? txn.metadata.lead.name
      : "";
    customTransaction.date = txn.date ? txn.date.toDateString() : "";
  }

  return customTransaction;
};

export default mongoose.model("Flat", flatSchema);
