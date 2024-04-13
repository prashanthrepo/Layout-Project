import { Request, Response } from "express"

import { layoutSchema } from "../zod/schemas"
import { ApprovalModel, LayoutApprovalModel } from "../models/approvalModel"
import { OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config"

const getApprovalList = async(req: Request, res: Response) => {

    const approvals = await ApprovalModel.find({})
    res.sendSuccess(approvals)


}


const createApproval = async(req: Request, res: Response) => {

    const approval = await ApprovalModel.create(req.body)
    await approval?.save()

    res.sendSuccess(approval,201)


}

const createApprovalMapping = async(req: Request, res: Response) => {

    const {layoutId:layout,approvals} = req.body

    for (const approval of approvals) {

        const obj = await LayoutApprovalModel.create({layout,approval})
        await obj.save()

    }
    res.sendSuccess({})






}

const updateApproval = async(req: Request, res: Response) => {

    const {layoutId:layout,approvalList} = req.body

    const approvals = []

    for (const {approval,value} of approvalList) {

        const approvalRecord = await LayoutApprovalModel.findOneAndUpdate({layout,approval},{value},{new:true})
        await approvalRecord?.save()
        approvals.push(approvalRecord)

        


    }

    res.sendSuccess(approvals)



}





const deleteApproval = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const lead = await ApprovalModel.findOneAndDelete({ _id: id })
        lead && res.sendSuccess({}, 200)
        !lead && res.sendError(OBJECT_NOT_FOUND)
    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }
}



const editApproval = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const approval = await ApprovalModel.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        )
        await approval?.save()
        !approval && res.sendError(OBJECT_NOT_FOUND)
        approval && res.sendSuccess(approval)

    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, { error })
    }


}


export { getApprovalList, createApproval,updateApproval,createApprovalMapping,editApproval,deleteApproval}