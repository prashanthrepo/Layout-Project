import express from "express"
import { requestOTP, updateProfile, validateOTP } from "../controllers/authController"
import { checkAuth } from "../middlewares"



export const router = express.Router()

router.post("/request-otp", requestOTP)
router.post("/validate-otp", validateOTP)
router.patch("/update-profile", checkAuth, updateProfile)


