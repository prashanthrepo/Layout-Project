import { Request, Response } from "express";
import { OBJECT_NOT_FOUND } from "../config";
import layoutModel from "../models/layoutModel";
import siteModel, { createCustomTransaction } from "../models/siteModel";
import transaction from "../models/transaction";
import UserModel from "../models/userModel";
import apartmentModel from "../models/apartmentModel";
import blockModel from "../models/blockModel";
import floorModel from "../models/floorModel";
import flatModel, { createCustomTransactionForFlat } from "../models/flatModel";

const getUserDetails = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (user) {
    const {
      first_name,
      last_name,
      phone_number,
      image,
      isVerified,
      role,
      email,
    } = user;
    const response = {
      first_name: first_name ? first_name : null,
      last_name: last_name ? last_name : null,
      email: email ? email : null,
      image: image ? image : null,
      role: role ? role : null,
      isVerified,
      phone_number,
    };
    res.sendSuccess(response);
  } else {
    res.sendError(OBJECT_NOT_FOUND);
  }
};

const getDashboardInfo = async (req: Request, res: Response) => {
  let customTxns: any = [];
  const layoutIds = await layoutModel
    .find({ user: req.userId })
    .distinct("_id");

    

  for (let layoutId of layoutIds) {
    const layout = await layoutModel.findById(layoutId).populate("sites");

    if (layout) {
      const sitePromises = layout.sites.map(async (site) => {
        
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
            const customTxn = createCustomTransaction(
              siteObj,
              txn as any,
              layout.name
            );
            customTxns.push(customTxn);
          }
        }

        // return customTxns;
      });

      await Promise.all(sitePromises);

      

      // const resolvedSiteTxns = await Promise.all(sitePromises) as Array<any[]>; // Array of arrays of custom transactions
      // const allCustomTxns = resolvedSiteTxns.flat(); // Flatten the array of arrays

      // res.sendSuccess(allCustomTxns);
    }
  }

  

  
  

  const apartmentIds = await apartmentModel
    .find({ user: req.userId })
    .distinct("_id");

  const blockIds = await blockModel
    .find({
      apartment: { $in: apartmentIds },
    })
    .distinct("_id");

  const floorIds = await floorModel
    .find({
      block: { $in: blockIds },
    })
    .distinct("_id");

  const flatIds = await flatModel
    .find({
      floor: { $in: floorIds },
    })
    .distinct("_id");

  

  
  


      const flatPromises = flatIds.map(async (flatId) => {
        const flatObj = await flatModel.findById(flatId).populate({
          path: "transactions",
          populate: [
            {path:"floor",},
            {path:"block",},
            {path:"apartment",},
            { path: "metadata.lead", model: "Lead" },
            {
              path: "metadata.token",
              model: "Token",
              populate: { path: "lead", model: "Lead" }, 
            },
          ],
        });

        const flatTxns = flatObj?.transactions;

        if (flatTxns) {
          for (let txn of flatTxns) {
            const customTxn = createCustomTransactionForFlat(
              flatObj,
              txn as any,
              
            );
            customTxns.push(customTxn);
          }
        }

        return customTxns;
      });

      await Promise.all(flatPromises);

      // const resolvedSiteTxns = await Promise.all(sitePromises) as Array<any[]>; // Array of arrays of custom transactions
      // const allCustomTxns = resolvedSiteTxns.flat(); // Flatten the array of arrays

      // res.sendSuccess(allCustomTxns);
      

      // console.log({customTxns})
    
  




let result1:any = {}
let result2:any = {}


  siteModel
    .aggregate([
      {
        $match: { layout: { $in: layoutIds } },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .then((result) => {
       result1 = {
         totalLayouts: layoutIds.length,
         totalSites: 0,
         tokenSites: 0,
         soldSites: 0,
        // transactions: customTxns,
      };

      result.forEach((item) => {
        if (item._id === "Token") {
          result1.tokenSites = item.count;
        } else if (item._id === "Sold") {
          result1.soldSites = item.count;
        }
        result1.totalSites += item.count;
      });

      // res.sendSuccess(result1);
    });
  
  
    flatModel
    .aggregate([
      {
        $match: { _id: { $in: flatIds } },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ])
    .then((result) => {
       result2 = {
         totalApartments: apartmentIds.length,
         totalFlats: 0,
         tokenFlats: 0,
         soldFlats: 0,
        transactions: customTxns,
      };

      result.forEach((item) => {
        if (item._id === "Token") {
          result2.tokenFlats = item.count;
        } else if (item._id === "Sold") {
          result2.soldFlats = item.count;
        }
        result2.totalFlats += item.count;
      });

      res.sendSuccess({...result1,...result2});
    
    
    });



  customTxns.sort((a: any, b: any) => {
    const dateA = new Date(a.date); // Get the date from the last property
    const dateB = new Date(b.date); // Get the date from the last property

    // Compare the dates in descending order
    if (isNaN(dateA.getTime())) {
      console.error("Invalid date for object:", a);
      return 0; // Return 0 if date is invalid
    }
    if (isNaN(dateB.getTime())) {
      console.error("Invalid date for object:", b);
      return 0; // Return 0 if date is invalid
    }

    // Compare the dates in descending order
    return dateB.getTime() - dateA.getTime();
  });





};

export { getDashboardInfo, getUserDetails };
