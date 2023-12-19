import express from "express"
import {
    createLayout,
    deleteLayout,
    getAllLeads,
    getLayoutLeads,
    getLayouts,
    getSingleLayout,
    updateLayout,
} from "../controllers/layoutController"

export const router = express.Router()

router.post("/", createLayout)
router.get("/", getLayouts)
router.get("/:id", getSingleLayout)
router.delete("/:id", deleteLayout)
router.patch("/:id", updateLayout)

router.get("/:id/leads", getLayoutLeads)
router.get("/:id/leads/all", getAllLeads)
