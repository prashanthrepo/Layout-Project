import express from "express"
import {
    createLayout,
    deleteLayout,
    // getAllLeads,
    getLayoutLeads,
    getLayoutTransactions,
    getLayouts,
    getSingleLayout,
    updateLayout,
} from "../controllers/layoutController"
import { validateId } from "../middlewares"

export const router = express.Router()

router.post("/", createLayout)
router.get("/", getLayouts)
router.get("/:id", validateId, getSingleLayout)
router.delete("/:id", validateId, deleteLayout)
router.patch("/:id", validateId, updateLayout)

router.get("/:id/leads", validateId, getLayoutLeads)
router.get("/:id/transactions", validateId, getLayoutTransactions)

