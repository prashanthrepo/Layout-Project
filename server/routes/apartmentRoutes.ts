import { Router } from "express";

import { checkAuth, isAdmin, validateId } from "../middlewares";
import {
  createApartment,
  getApartmentsList
} from "../controllers/apartmentController";

export const router = Router();

// router.post("/select-approvals", checkAuth, createApprovalMapping)
// router.patch("/", checkAuth, updateApproval)

// router.get("/", checkAuth,  getApprovalList);
// router.post("/", checkAuth, isAdmin, createApartment);




// router.patch("/:id", checkAuth, isAdmin, editApproval);
// router.delete("/:id", checkAuth, isAdmin, deleteApproval);


router.post("/",  createApartment);
router.get("/",  getApartmentsList);
