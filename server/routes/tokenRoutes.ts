import { Router } from "express"

import { cancelToken } from "../controllers/tokenController"
import { validateId } from "../middlewares"

export const router = Router()

router.post("/cancel/:id", validateId, cancelToken)