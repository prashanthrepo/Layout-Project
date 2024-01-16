import { Request, Response } from "express";
import { SOMETHING_WENT_WRONG } from "../config";
import Site from "../models/siteModel";
import Token from "../models/token";
import { logTransaction } from "./transactionController";


const cancelToken = async (req: Request, res: Response) => {

    const { id } = req.params
    const { cancellationReason } = req.body

    try {
        const token = await Token.findById(id)
        if (token) {
            token.status = "inactive"
            token.cancellationReason = cancellationReason
            token.cancelledDate = new Date()
            await token.save()
            const site = await Site.findById(token.site)
            if (site) {
                site.status = "Available"
                await site.save()
                await logTransaction(
                    site._id,
                    "STATUS_CHANGE",
                    {
                        prevStatus: "Token",
                        currentStatus: "Available",
                    }
                )
                res.sendSuccess()
            }

        }









    } catch (error) {

        res.sendError(SOMETHING_WENT_WRONG)

    }




}


export { cancelToken };


