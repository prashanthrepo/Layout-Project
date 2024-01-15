import { Router } from "express"
import {
    getSingleSite,
    getSiteLeads,
    getSiteTransactions,
    updateSite,
} from "../controllers/siteController"
import { validateId } from "../middlewares"

export const router = Router()

router.get("/:id", validateId, getSingleSite)
router.patch("/:id", validateId, updateSite)
router.get("/:id/leads", validateId, getSiteLeads)
router.get("/:id/transactions", validateId, getSiteTransactions)
