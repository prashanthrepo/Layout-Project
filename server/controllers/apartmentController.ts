import { Request, Response } from "express";

import { BAD_REQUEST, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config";
import { apartmentSchema, layoutSchema } from "../zod/schemas";
import apartmentModel from "../models/apartmentModel";
import UserModel from "../models/userModel";

const createApartment = async (req: Request, res: Response) => {
  try {
    const parsedData = apartmentSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.sendError(BAD_REQUEST, { details: parsedData.error.issues });
    } else {
      const apartment = await apartmentModel.create({ ...parsedData.data });
      await apartment.save();
      res.sendSuccess(apartment, 201);
    }
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const getApartmentsList = async (req: Request, res: Response) => {
    try {
      const userRole = await UserModel.getUserRoleById(req.userId as string);
  
      let filter: any = { user: req.userId as string };
      if (userRole === 'Admin' || userRole === 'Buyer') filter = {};
  
      const apartments = await apartmentModel.find({})
        .select('-location._id')
        .sort({ createdAt: -1 });
      res.sendSuccess(apartments);
    } catch (error) {
      res.sendError(SOMETHING_WENT_WRONG, { error });
    }
  };

export { createApartment,getApartmentsList };




// jcp /apartments '{ "user":"65cded8af449b74a58d12e21", "name": "Canduer Novo", "description": "Luxury redefined", "image": "https://example.com/sample-image.jpg", "location": { "lat": 40.7128, "long": -74.0060 }, "coordinates" :  [ { "lat": 40.7128, "long": -74.0060 }, { "lat": 40.7128, "long": -74.0060 }, { "lat": 40.7128, "long": -74.0060 }, { "lat": 40.7128, "long": -74.0060 } ], "approvals":["BDA","BESCOM"] }'