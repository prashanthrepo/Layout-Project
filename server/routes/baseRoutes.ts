import express, { Request, Response } from "express"
import { getDashboardInfo, getUserDetails } from "../controllers/baseController"
import { checkAuth } from "../middlewares"

export const router = express.Router()





router.get("/me", checkAuth, getUserDetails)
router.get("/dashboard",  getDashboardInfo)




router.get("/", (req: Request, res: Response) => {
    res.sendSuccess({ message: "hello" })
})
