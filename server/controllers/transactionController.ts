import { Types } from "mongoose";
import siteModel from "../models/siteModel";
import transaction from "../models/transaction";
import flatTransaction from "../models/flatTransaction";
import flatModel from "../models/flatModel";

const logTransaction = async (
  siteId: Types.ObjectId,
  txnType: string,
  metadata: Object
) => {
  const txnData = {
    site: siteId,
    type: txnType,
    metadata,
    date: new Date(),
  };

  const txn = await transaction.create(txnData);
  await txn.save();
  const site = await siteModel.findById(siteId);
  site?.transactions.push(txn._id);
  await site?.save();
};

const logTransactionForFlat = async (
  flatId: Types.ObjectId,
  floorId: Types.ObjectId,
  blockId: Types.ObjectId,
  apartmentId: Types.ObjectId,
  txnType: string,
  metadata: Object
) => {
  const txnData = {
    site: flatId,
    floor: floorId,
    block: blockId,
    apartment: apartmentId,
    type: txnType,
    metadata,
    date: new Date(),
  };

  const txn = await flatTransaction.create(txnData);
  await txn.save();
  const flat = await flatModel.findById(flatId);
  flat?.transactions.push(txn._id);
  await flat?.save();
};

export { logTransaction, logTransactionForFlat };
