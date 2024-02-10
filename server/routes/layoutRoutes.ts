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
import { checkAuth, validateId } from "../middlewares"

export const router = express.Router()

router.post("/", checkAuth, createLayout)
router.get("/", checkAuth, getLayouts)
router.get("/:id", checkAuth, validateId, getSingleLayout)
router.delete("/:id", checkAuth, validateId, deleteLayout) // TODO: add m/w to check if layoutOwner/admin
router.patch("/:id", checkAuth, validateId, updateLayout)

router.get("/:id/leads", checkAuth, validateId, getLayoutLeads)
router.get("/:id/transactions", checkAuth, validateId, getLayoutTransactions)

