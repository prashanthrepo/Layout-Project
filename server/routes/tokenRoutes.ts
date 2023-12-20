import { Router } from "express"
import { createToken } from "../controllers/tokenController"

export const router = Router()

router.post("/", createToken)
