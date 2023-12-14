import express from "express"
import { getSingleSite, updateSite } from "../controllers/siteController"

export const router = express.Router()

router.get("/:id", getSingleSite)
router.patch("/:id", updateSite)
