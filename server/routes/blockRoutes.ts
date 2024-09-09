import { Router } from "express";

import { checkAuth, isAdmin, validateId } from "../middlewares";
import { createBlock } from "../controllers/blockController";


export const router = Router();

// router.post("/select-approvals", checkAuth, createApprovalMapping)
// router.patch("/", checkAuth, updateApproval)

// router.get("/", checkAuth,  getApprovalList);
// router.post("/", checkAuth, isAdmin, createApproval);
// router.patch("/:id", checkAuth, isAdmin, editApproval);
// router.delete("/:id", checkAuth, isAdmin, deleteApproval);



// router.get("/", checkAuth,  getApprovalList);
router.post("/", createBlock);
// router.patch("/:id", checkAuth, isAdmin, editApproval);
// router.delete("/:id", checkAuth, isAdmin, deleteApproval);
