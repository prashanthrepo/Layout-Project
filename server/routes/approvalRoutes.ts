import { Router } from "express";

import { checkAuth, isAdmin, validateId } from "../middlewares";
import {
  createApproval,
  createApprovalMapping,
  deleteApproval,
  editApproval,
  getApprovalList,
  updateApproval,
} from "../controllers/approvalController";

export const router = Router();

// router.post("/select-approvals", checkAuth, createApprovalMapping)
// router.patch("/", checkAuth, updateApproval)

router.get("/", checkAuth,  getApprovalList);
router.post("/", checkAuth, isAdmin, createApproval);
router.patch("/:id", checkAuth, isAdmin, editApproval);
router.delete("/:id", checkAuth, isAdmin, deleteApproval);
