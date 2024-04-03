import { Request, Response } from "express"

import { layoutSchema } from "../zod/schemas"
import { ApprovalModel, LayoutApprovalModel } from "../models/approvalModel"

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





export { getApprovalList, createApproval,updateApproval,createApprovalMapping}