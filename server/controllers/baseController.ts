
import { Request, Response } from "express"
import { OBJECT_NOT_FOUND } from "../config"
import layoutModel from "../models/layoutModel"
import siteModel from "../models/siteModel"
import UserModel from "../models/userModel"



const getUserDetails = async (req: Request, res: Response) => {

    const user = await UserModel.findById(req.userId)
    if (user) {
        const { first_name, last_name, phone_number, image, isVerified, role } = user
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

}


const getDashboardInfo = async (req: Request, res: Response) => {

    const layoutIds = await layoutModel.find({ user: "65cded8af449b74a58d12e21" }).distinct('_id');
    siteModel.aggregate([
        {
            $match: { layout: { $in: layoutIds } }
        },
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1
                }
            },
        },

    ]).then((result) => {

        let result1 = {
            soldSites: 0,
            tokenSites: 0,
            totalSites: 0,
            totalLayouts: layoutIds.length
        };
        result.forEach(item => {
            if (item._id === 'Token') {
                result1.tokenSites = item.count;
            } else if (item._id === 'Sold') {
                result1.soldSites = item.count;
            }
            result1.totalSites += item.count;
        });


        res.sendSuccess(result1)


    })



}

export { getDashboardInfo, getUserDetails }

