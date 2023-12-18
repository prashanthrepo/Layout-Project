import { Router } from "express"
import {
    createLead,
    deleteLead,
    updateLead,
} from "../controllers/leadController"

export const router = Router()

router.post("/", createLead)
router.delete("/:id", deleteLead)
router.patch("/:id", updateLead)
