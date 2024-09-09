import { Router } from "express";

import { checkAuth, isAdmin, validateId } from "../middlewares";
import {
  createBlock,
  getApartmentBlocks,
//   getFullBlockData,
  getFullBlockData,
} from "../controllers/blockController";

export const router = Router();

// router.post("/select-approvals", checkAuth, createApprovalMapping)
// router.patch("/", checkAuth, updateApproval)

// router.get("/", checkAuth,  getApprovalList);
// router.post("/", checkAuth, isAdmin, createApproval);
// router.patch("/:id", checkAuth, isAdmin, editApproval);
// router.delete("/:id", checkAuth, isAdmin, deleteApproval);

router.get("/:apartmentId", getApartmentBlocks);
router.get("/:apartmentId/:blockId", getFullBlockData);
router.post("/", createBlock);
// router.patch("/:id", checkAuth, isAdmin, editApproval);
// router.delete("/:id", checkAuth, isAdmin, deleteApproval);
