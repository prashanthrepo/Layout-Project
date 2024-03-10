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
import { checkAuth, isAdmin, validateId } from "../middlewares"

export const router = express.Router()

router.post("/", checkAuth, isAdmin, createLayout)
router.get("/", checkAuth, getLayouts)
router.get("/:id", checkAuth, validateId, getSingleLayout)
router.delete("/:id", checkAuth, isAdmin, validateId, deleteLayout) // TODO: add m/w to check if layoutOwner/admin
router.patch("/:id", checkAuth, validateId, updateLayout)

router.get("/:id/leads", checkAuth, validateId, getLayoutLeads)
router.get("/:id/transactions", checkAuth, validateId, getLayoutTransactions)

