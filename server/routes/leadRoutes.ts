import { Router } from "express"
import {
    createLead,
    deleteLead,
    updateLead,
} from "../controllers/leadController"
import { validateId } from "../middlewares"

export const router = Router()

router.post("/", createLead)
router.delete("/:id",validateId , deleteLead)
router.patch("/:id",validateId ,updateLead)
