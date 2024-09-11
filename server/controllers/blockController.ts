import { Request, Response } from "express";

import blockModel from "../models/blockModel";
import floorModel, { Floor } from "../models/floorModel";
import flatModel from "../models/flatModel";

const createBlock = async (req: Request, res: Response) => {
  const { apartmentId: apartment, blockName, floorsInfo } = req.body;
  const block = await blockModel.create({ blockName, apartment });
  await block.save();

  await Promise.all<Floor["_id"]>(
    floorsInfo.map(async (floorData: any) => {
      const { floorName, flats } = floorData;
      const floor = await floorModel.create({ floorName, block: block._id });
      await floor.save();

      flats.map(async (flatData: any) => {
        const { flatName, status, points, info } = flatData;
        const flat = await flatModel.create({
          flatName,
          status,
          floor,
          points,
          info,
        });
        await flat.save();
      });
    })
  );

  res.sendSuccess({}, 201);
};

const getApartmentBlocks = async (req: Request, res: Response) => {
  const { apartmentId } = req.params;
  console.log(apartmentId);

  const blocks = await blockModel.find({ apartment: apartmentId });

  res.sendSuccess(blocks);
};

const getFullBlockData = async (req: Request, res: Response) => {
  try {
    const { blockId, apartmentId } = req.params;

    // Fetch the block details with the associated apartment and floors
    const blockData = await blockModel
      .findById(blockId)
      .populate({
        path: "apartment",
        match: { _id: apartmentId },
      })
      .exec();

    if (!blockData) {
      return res.status(404).json({ message: "Block not found" });
    }

    // Fetch all floors in the block
    const floors = await floorModel.find({ block: blockId }).exec();

    const floorsInfo = await Promise.all(
      floors.map(async (floor) => {
        // Fetch flats in each floor

        const flats = await flatModel.find({ floor: floor._id });

        const flatInfo = flats.map((flat) => ({
          flatId: flat._id,
          flatName: flat.flatName,
          status: flat.status,
          points: flat.points,
          info: flat.info.map((infoItem) => ({
            text: infoItem.text,
            transform: infoItem.transform,
            type: infoItem.type,
          })),
        }));

        return {
          floorName: floor.floorName,
          floorId: floor._id,
          flats: flatInfo,
        };
      })
    );

    const response = {
      apartmentId,
      blockId: blockData._id,
      blockName: blockData.blockName,
      noOfFloors: floors.length,
      floorsInfo,
    };

    res.sendSuccess(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createBlock, getApartmentBlocks, getFullBlockData };
