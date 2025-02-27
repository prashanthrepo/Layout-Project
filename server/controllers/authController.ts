import { Request, Response } from "express"
import { BAD_REQUEST, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG, UNAUTHORISED, OBJECT_USER_INACTIVATED, OBJECT_USER_ACTIVATED } from "../config"
import UserModel from "../models/userModel"
import JWTService from "../services/jwt"
import MSG91Service from "../services/msg91"
import OTPService from "../services/otp"



const updateProfile = async (req: Request, res: Response) => {

    let { phone_number, ...updateData } = req.body
    const userId = req.userId

    if (updateData?.first_name && updateData?.last_name) { updateData["isVerified"] = true }
    else { updateData["isVerified"] = false }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true })
        res.sendSuccess(updatedUser)
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
            if (!req.body.hasOwnProperty("role")) {

                return res.sendError(BAD_REQUEST, { error: "Property 'role' is required for registration." })

            }
            user = await UserModel.create(req.body)
            await user.save()
        }


        const name = user.first_name ? user.first_name : user.role
        // const otp = OTPService.generateOTP()
        // user.otp = otp
        const hardcodedOTP = user.role === 'Admin' ? '0000' : user.role === 'Seller' ? '1111' : user.role === 'Buyer' ? '2222' : '9999'
        user.otp = hardcodedOTP
        await user.save()
        // await MSG91Service.sendSMS({ name: `${name}-${user.phone_number}`, otp }) /* TODO : add job to OTP-queue  */
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
                if (user.first_name && user.last_name) {
                    user.isVerified = true
                }
                await user.save()
                const token = JWTService.generateToken({ userId: user._id, })
                res.sendSuccess({ token, accountVerified: user.isVerified })
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

// Inactivate: 1 -> activate and 0 -> Inactivate

const inActivateFn = async (req: Request, res: Response) => {

    const { userId } = req.params
    try {
        const user = await UserModel.findById(userId)
        if (user) {
            await UserModel.findByIdAndUpdate(userId,
                { $set: { status: 0 } }, // Explicitly updating only the `status` field
                { new: true, projection: { status: 1 } })
            res.sendSuccess(OBJECT_USER_INACTIVATED,)
        }
        else {
            res.sendError(OBJECT_NOT_FOUND)

        }
    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG)
    }
}


const activateFn = async (req: Request, res: Response) => {

    const { userId } = req.params
    try {
        const user = await UserModel.findById(userId)
        if (user) {
            await UserModel.findByIdAndUpdate(userId,
                { $set: { status: 1 } }, // Explicitly updating only the `status` field
                { new: true, projection: { status: 1 } })
            res.sendSuccess(OBJECT_USER_ACTIVATED)
        }
        else {
            res.sendError(OBJECT_NOT_FOUND)

        }
    }
    catch (error) {
        res.sendError(SOMETHING_WENT_WRONG)
    }
}


export { requestOTP, updateProfile, validateOTP, inActivateFn, activateFn }

