import express from "express"
import { requestOTP, updateProfile, validateOTP, inActivateFn, activateFn } from "../controllers/authController"
import { checkAuth } from "../middlewares"
import UserModel from "../models/userModel"



export const router = express.Router()

router.get("/all-users", async (req, res) => {

    

    const users = await UserModel.find({})
    let phone_numbers = users.map((user) => user.phone_number)
    phone_numbers = phone_numbers.sort()

    const userIdsWithPhoneNumbers = users.map(user => ({
        userId: user._id,
        fullName: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        phoneNumber: user.phone_number,
        role:user.role
      }));

      //console.log(userIdsWithPhoneNumbers);
    res.sendSuccess(userIdsWithPhoneNumbers)

})
router.post("/request-otp", requestOTP)
router.post("/validate-otp", validateOTP)
router.patch("/update-profile", checkAuth, updateProfile)
exports.router.patch("/inactivate/:userId", inActivateFn);
exports.router.patch("/activate/:userId", activateFn);


