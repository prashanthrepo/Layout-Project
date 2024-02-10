import { Router } from "express"

import { cancelToken } from "../controllers/tokenController"
import { checkAuth, validateId } from "../middlewares"

export const router = Router()

router.post("/cancel/:id", checkAuth, validateId, cancelToken)