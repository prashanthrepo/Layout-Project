import express from "express"
import { createLayout, getLayouts, getSingleLayout } from "../controllers/layoutController"

export const router = express.Router()

router.post("/", createLayout)
router.get("/", getLayouts)
router.get("/:id", getSingleLayout)
