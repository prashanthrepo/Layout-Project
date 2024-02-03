import { Request, Response } from "express"
import { OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG, UNAUTHORISED } from "../config"
import UserModel from "../models/userModel"
import JWTService from "../services/jwt"
import MSG91Service from "../services/msg91"
import OTPService from "../services/otp"



const updateProfile = async (req: Request, res: Response) => {

    const { phone_number, ...updateData } = req.body
    try {
        const user = await UserModel.findOneAndUpdate({ phone_number }, updateData, { new: true })
        res.sendSuccess(user)
    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}


const requestOTP = async (req: Request, res: Response) => {
    const { phone_number } = req.body
    try {


        let user
        user = await UserModel.findOne({ phone_number })
        if (!user) {
            user = await UserModel.create(req.body)
            await user.save()
        }


        // const otp = "0000"
        const otp = OTPService.generateOTP()
        user.otp = otp
        await user.save()
        await MSG91Service.sendSMS({ name: user.phone_number, otp }) /* TODO : add job to OTP-queue  */
        res.sendSuccess({ message: "OTP sent" })


    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}

const validateOTP = async (req: Request, res: Response) => {

    const { phone_number, otp } = req.body
    try {
        const user = await UserModel.findOne({ phone_number })
        if (user) {
            if (user.otp === otp) {
                user.otp = ""
                // TODO : set accountVerified = True ?
                await user.save()
                const token = JWTService.generateToken({ userId: user._id })
                res.sendSuccess({ token })
            }
            else {
                res.sendError(UNAUTHORISED, {
                    error: "Wrong OTP"
                },)
            }
        }
        else {
            res.sendError(OBJECT_NOT_FOUND)

        }
    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG)
    }
}


export { requestOTP, updateProfile, validateOTP }
