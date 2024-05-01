import { Request, Response } from "express";
import { BAD_REQUEST, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config";
import layoutModel, { default as Layout } from "../models/layoutModel";
import siteModel, {
  Site,
  createCustomTransaction,
  siteSchema,
} from "../models/siteModel";
import transaction, { TransactionDocument } from "../models/transaction";
import { layoutSchema, transactionSchema } from "../zod/schemas";
import UserModel from "../models/userModel";
import { LayoutApprovalModel } from "../models/approvalModel";

const createLayout = async (req: Request, res: Response) => {
  try {
    const parsedData = layoutSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.sendError(BAD_REQUEST, { details: parsedData.error.issues });
    } else {
      const layout = await Layout.create({ ...parsedData.data });
      const createdSites = await Promise.all<Site["_id"]>(
        parsedData.data.layoutJSON.map(async (siteData) => {
          const site = new siteModel({ ...siteData, layout: layout._id });
          await site.save();
          return site._id;
        })
      );
      layout.sites = createdSites;
      await layout.save();
      res.sendSuccess(layout, 201);
    }
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getLayouts = async (req: Request, res: Response) => {
  try {
    const userRole = await UserModel.getUserRoleById(req.userId as string);

    let filter: any = { user: req.userId as string };
    if (userRole === "Admin" || userRole === "Buyer") filter = {};

    const layouts = await Layout.find(filter)
      .select("-sites -location._id")
      .sort({ createdAt: -1 });
    res.sendSuccess(layouts);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getSingleLayout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const layout = await Layout.findOne({ _id: id }).populate("sites");
    const layoutApprovals = await LayoutApprovalModel.find({
      layout: layout?._id,
    }).populate("approval");
    const approvals = [];
    for (const obj of layoutApprovals) {
      approvals.push({
        approvalId: obj.approval._id,
        name: obj.approval.name,
        value: obj.value,
      });
    }
    const layoutObj = {
      name: layout?.name,
      description: layout?.description,
      slug: layout?.slug,
      location: layout?.location,
      approvals,
      image: layout?.image,
      sites: layout?.sites,
      user: layout?.user,
    };
    !layout && res.sendError(OBJECT_NOT_FOUND);
    layout && res.sendSuccess(layoutObj);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const deleteLayout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const layout = await Layout.findOneAndDelete({ _id: id });
    !layout && res.sendError(OBJECT_NOT_FOUND);
    layout && res.sendSuccess({}, 200);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const updateLayout = async (req: Request, res: Response) => {
  
  const { id } = req.params;
  
  try {
    const approvals:any[] = []
    if (req.body.hasOwnProperty("approvals")) {
      for (const item of req.body.approvals) {
        
        
        const objj = await LayoutApprovalModel.findOne({layout:id,approval:item.approvalId})
        if (objj)
          {

            objj.value = item.value
            objj.save()

            approvals.push(objj)


          }

          else {

          
        
        
        
        const obj = await LayoutApprovalModel.create({
          layout: id,
          approval: item.approvalId,
          value: item.value,
        });
        await obj.save();

        approvals.push(obj)

      }
      
      
      
      
      
      }

      delete req.body.approvals;
    }

    

    const layout = await Layout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    
    await layout?.save();

    

    const layoutObj = {
      name: layout?.name,
      description: layout?.description,
      slug: layout?.slug,
      location: layout?.location,
      approvals,
      image: layout?.image,
      sites: layout?.sites,
      user: layout?.user,
    };




    !layout && res.sendError(OBJECT_NOT_FOUND);
    layout && res.sendSuccess(layoutObj);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getLayoutLeads = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const layout = await Layout.findById(id).populate({
      path: "leads",
      options: { sort: { createdAt: -1 } },
    });
    if (layout) {
      const leads = layout.leads;
      res.sendSuccess(leads);
    } else {
      res.sendError(OBJECT_NOT_FOUND);
    }
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getLayoutTransactions = async (req: Request, res: Response) => {
  try {
    const { id, date } = req.params;
    // TODO: Add option to filter by date

    const layout = await layoutModel.findById(id).populate("sites");

    if (layout) {
      const sitePromises = layout.sites.map(async (site) => {
        const customTxns = [];

        const siteObj = await siteModel.findById(site).populate({
          path: "transactions",
          populate: [
            { path: "metadata.lead", model: "Lead" },
            {
              path: "metadata.token",
              model: "Token",
              populate: { path: "lead", model: "Lead" }, // Recursively populate lead within token
            },
          ],
        });

        const siteTxns = siteObj?.transactions;

        if (siteTxns) {
          for (let txn of siteTxns) {
            const customTxn = createCustomTransaction(siteObj, txn as any);
            customTxns.push(customTxn);
          }
        }

        return customTxns;
      });

      const resolvedSiteTxns = (await Promise.all(sitePromises)) as Array<
        any[]
      >; // Array of arrays of custom transactions
      const allCustomTxns = resolvedSiteTxns.flat(); // Flatten the array of arrays

      res.sendSuccess(allCustomTxns);
    }
  } catch (error) {
    console.error("Error in getLayoutTransactions:", error);
    res.sendError(SOMETHING_WENT_WRONG);
  }
};

export {
  createLayout,
  deleteLayout,
  getLayoutLeads,
  getLayoutTransactions,
  getLayouts,
  getSingleLayout,
  updateLayout,
};
