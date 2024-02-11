import express, { Request, Response } from "express"
import { OBJECT_NOT_FOUND } from "../config"
import { checkAuth } from "../middlewares"
import UserModel from "../models/userModel"

export const router = express.Router()


router.get("/me", checkAuth, async (req: Request, res: Response) => {

    const user = await UserModel.findById(req.userId)
    if (user) {
        const { first_name, last_name, phone_number, image, isVerified,role } = user
        const response = {
            first_name: first_name ? first_name : null,
            last_name: last_name ? last_name : null,
            image: image ? image : null,
            role: role ? role : null,
            isVerified, phone_number
        }
        res.sendSuccess(response)
    }
    else {
        res.sendError(OBJECT_NOT_FOUND)
    }

})

router.get("/", (req: Request, res: Response) => {
    res.sendSuccess({ message: "hello" })
})
