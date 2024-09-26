import { Request, Response } from "express";
import { Types } from "mongoose";
import { OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config";
import leadModel from "../models/leadModel";

import token from "../models/token";
import { TransactionDocument } from "../models/transaction";
import { logTransactionForFlat } from "./transactionController";
import flatModel, { createCustomTransactionForFlat } from "../models/flatModel";
import { createLead, createToken } from "./siteController";
import { populate } from "dotenv";

const getSingleSite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const site = await flatModel
      .findOne({ _id: id })
      .select("-leads -points -info -transactions")
      .populate({
        path: "statusMetadata.token",
        populate: {
          path: "lead",
        },
      })
      .populate({
        path: "statusMetadata.lead",
      });
    !site && res.sendError(OBJECT_NOT_FOUND);
    site && res.sendSuccess(site, 200);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const updateSite = async (req: Request, res: Response) => {
  const { id } = req.params;

  const site = await flatModel.findOne({ _id: id });
  !site && res.sendError(OBJECT_NOT_FOUND);
  let prevStatus;

  if ("status" in req.body) {
    prevStatus = site?.status;
    if (req.body.status === "Token") {
      if ("token" in req.body) {
        let lead;
        if ("contactId" in req.body.token) {
          lead = await createLead({
            ...req.body.token,
            siteId: site?._id,
          });
        }
        const tokenId = await createToken({
          lead,
          ...req.body.token,
          site: id,
        });
        req.body.statusMetadata.token = tokenId;
      }
    } else if (req.body.status === "Sold") {
      if ("lead" in req.body) {
        const leadId = await createLead({
          ...req.body.lead,
          siteId: id,
        });

        req.body.statusMetadata.lead = leadId;
      }
      req.body.statusMetadata.soldDate = new Date();
    }
  }

  const updatedFlat = await flatModel
    .findByIdAndUpdate(site?._id, req.body, {
      new: true,
    })
    .populate({
      path: "floor",
      populate: { path: "block", populate: { path: "apartment" } },
    });

  // console.log(
  //   updatedFlat?._id,
  //   updatedFlat?.floor._id,
  //   updatedFlat?.floor.block._id,
  //   updatedFlat?.floor.block.apartment._id
  // );

  if ("status" in req.body) {
    await logTransactionForFlat(
      updatedFlat?._id as Types.ObjectId,
      updatedFlat?.floor._id as Types.ObjectId,
      updatedFlat?.floor.block._id as Types.ObjectId,
      updatedFlat?.floor.block.apartment._id as Types.ObjectId,
      "STATUS_CHANGE",
      {
        prevStatus,
        currentStatus: updatedFlat?.status,
        token: updatedFlat?.statusMetadata?.token,
        lead: updatedFlat?.statusMetadata?.lead,
        soldDate: updatedFlat?.statusMetadata?.soldDate,
      }
    );
  }

  res.sendSuccess(updatedFlat);
};

const getSiteLeads = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const site = await flatModel.findById(id).populate({
      path: "leads",
      options: { sort: { createdAt: -1 } },
    });

    if (site) {
      // const leads = site?.leads;
      const leads = await leadModel.find({ siteId: site._id });
      res.sendSuccess(leads);
    }

    !site && res.sendError(OBJECT_NOT_FOUND);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getFlatTransactions = async (req: Request, res: Response) => {
  const { id } = req.params;
  const customTxns = [];
  const flatObj = await flatModel.findById(id)
  // .populate({
  //   path: "transactions",
  // })
  
  
  .populate({
    path: "transactions",
    populate: [
      {path:"floor",},
      {path:"block",},
      {path:"apartment",},
      { path: "metadata.lead", model: "Lead" },
      {
        path: "metadata.token",
        model: "Token",
        populate: { path: "lead", model: "Lead" }, // Recursively populate lead within token
      },
    ],
  })

  // console.log(flatObj);

  if (flatObj) {
    const siteTxns = flatObj?.transactions;

    if (siteTxns) {
      for (let txn of siteTxns) {

        // console.log({txn})
        const customTxn = createCustomTransactionForFlat(flatObj, txn as any);
        customTxns.push(customTxn);
      }
    }

    customTxns.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (isNaN(dateA.getTime())) {
        console.error("Invalid date for object:", a);
        return 0;
      }
      if (isNaN(dateB.getTime())) {
        console.error("Invalid date for object:", b);
        return 0;
      }

      return dateB.getTime() - dateA.getTime();
    });

    res.sendSuccess(customTxns);

    // res.sendSuccess({});
  }

  !flatObj && res.sendError(OBJECT_NOT_FOUND);
};

// const fetchTokenDetails = async (tokenId: string) => {
//   const tokenObj = await token.findById(tokenId).populate("lead");
//   return tokenObj;
// };

// const fetchLeadDetails = async (leadId: string) => {
//   const leadObj = await leadModel.findById(leadId);
//   return leadObj;
// };

// function isTransaction(obj: any): obj is TransactionDocument {
//   return obj && obj.metadata !== undefined;
// }

// async function createLead(leadData: any) {
//   const lead = await leadModel.create({ ...leadData });
//   await lead.save();
//   return lead._id;
// }

// async function createToken(tokenData1: any) {
//   const { validity, ...tokenData } = tokenData1;

//   const currentDate = new Date();

//   if (validity) {
//     const expiryDate = new Date(currentDate);
//     expiryDate.setDate(currentDate.getDate() + validity);
//     const tokenObj = await token.create({ ...tokenData, expiryDate });

//     return tokenObj._id;
//   }
// }

export { getSingleSite, getSiteLeads, getFlatTransactions, updateSite };
