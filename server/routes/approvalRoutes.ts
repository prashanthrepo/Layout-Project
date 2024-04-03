import { Router } from "express"


import { checkAuth, isAdmin, validateId } from "../middlewares"
import { createApproval, createApprovalMapping, getApprovalList, updateApproval } from "../controllers/approvalController"

export const router = Router()




router.get("/", checkAuth, getApprovalList)
router.post("/", checkAuth, isAdmin, createApproval)
router.post("/select-approvals", checkAuth, createApprovalMapping)
router.patch("/", checkAuth, updateApproval)


