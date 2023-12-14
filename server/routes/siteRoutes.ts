import express from "express"
import { getSingleSite } from "../controllers/siteController"

export const router = express.Router()

router.get("/:id", getSingleSite)
