import express from "express"
import { requestOTP, updateProfile, validateOTP } from "../controllers/authController"
import { checkAuth } from "../middlewares"
import UserModel from "../models/userModel"



export const router = express.Router()

router.get("/all-users", async (req, res) => {

    const users = await UserModel.find({})
    let phone_numbers = users.map((user) => user.phone_number)
    phone_numbers = phone_numbers.sort()
    res.sendSuccess(phone_numbers)

})
router.post("/request-otp", requestOTP)
router.post("/validate-otp", validateOTP)
router.patch("/update-profile", checkAuth, updateProfile)


