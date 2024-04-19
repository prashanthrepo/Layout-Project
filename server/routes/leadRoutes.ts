import { Router } from "express"
import {
    createLead,
    deleteLead,
    getAllLeads,
    updateLead,
} from "../controllers/leadController"
import { checkAuth, validateId } from "../middlewares"

export const router = Router()

router.post("/", checkAuth, createLead)
// router.get("/", checkAuth, getAllLeads)
router.delete("/:id", checkAuth, validateId, deleteLead)
router.patch("/:id", checkAuth, validateId, updateLead)


