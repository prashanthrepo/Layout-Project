import { Router } from "express"
import {
    getSingleSite,
    getSiteLeads,
    updateSite,
} from "../controllers/siteController"

export const router = Router()

router.get("/:id", getSingleSite)
router.patch("/:id", updateSite)
router.get("/:id/leads", getSiteLeads)
