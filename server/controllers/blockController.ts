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

// jcp /blocks/ '{ "apartmentId": "39ab234cf12", "blockName": "Block A", "noOfFloors": 2, "floorsInfo": [ { "floorName": "First Floor", "flats": [ { "flatName": "A101", "status": "Available", "points": "21.67,146.36 112.8,146.36 112.8,72.79 52.16,72.79 52.16,60.53 21.67,60.53 21.67,103.44 15.37,103.44 15.37,116.2 21.5,116.04 ", "info": [ { "text": "A101", "transform": "matrix(1 0 0 1 56.481 96.6799)", "type": "flatno" }, { "text": "WEST", "transform": "matrix(1 0 0 1 56.3 124.99)", "type": "facing" }, { "text": "1495", "transform": "matrix(1 0 0 1 56.25 106.82)", "type": "area" }, { "text": "3", "transform": "matrix(1 0 0 1 63.55 116.27)", "type": "bhk" } ] } ] }, { "floorName": "Second Floor", "flats": [ { "flatName": "A201", "status": "Sold", "points": "21.67,146.36 112.8,146.36 112.8,72.79 52.16,72.79 52.16,60.53 21.67,60.53 21.67,103.44 15.37,103.44 15.37,116.2 21.5,116.04 ", "info": [ { "text": "A201", "transform": "matrix(1 0 0 1 56.481 96.6799)", "type": "flatno" }, { "text": "WEST", "transform": "matrix(1 0 0 1 56.3 124.99)", "type": "facing" }, { "text": "1495", "transform": "matrix(1 0 0 1 56.25 106.82)", "type": "area" }, { "text": "3", "transform": "matrix(1 0 0 1 63.55 116.27)", "type": "bhk" } ] }, { "flatName": "A202", "status": "Sold", "points": "21.67,146.36 112.8,146.36 112.8,72.79 52.16,72.79 52.16,60.53 21.67,60.53 21.67,103.44 15.37,103.44 15.37,116.2 21.5,116.04 ", "info": [ { "text": "A202", "transform": "matrix(1 0 0 1 56.481 96.6799)", "type": "flatno" }, { "text": "WEST", "transform": "matrix(1 0 0 1 56.3 124.99)", "type": "facing" }, { "text": "1495", "transform": "matrix(1 0 0 1 56.25 106.82)", "type": "area" }, { "text": "3", "transform": "matrix(1 0 0 1 63.55 116.27)", "type": "bhk" } ] } ] } ] }'

export { createBlock };
