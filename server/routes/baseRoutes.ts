import { Queue } from "bullmq"
import express, { Request, Response } from "express"
import { SOMETHING_WENT_WRONG, redisConnection } from "../config"

export const router = express.Router()



router.post("/me", (req: Request, res: Response) => {
    const { user } = req.body
    const response = {
        id: `${user}_583c3ac3f38e84297c002546`,
        email: `${user}-email@gmail.com`,
        name: `${user}-name`,
        role: user.charAt(0).toUpperCase() + user.slice(1),
    }
    res.sendSuccess(response)
})

router.get("/", (req: Request, res: Response) => {
    res.sendSuccess({ message: "hello" })
})





router.get("/queue", async (req: Request, res: Response) => {

    const emailQueue = new Queue("email-queue", {
        connection: {}
    })


    try {

        const num = Date.now()
        await emailQueue.add(`job-${num}}`, { to: `sender-${num}` })
    } catch (error) {
        res.sendError(SOMETHING_WENT_WRONG, {})
    }
    res.sendSuccess({ message: "success from `/queue`" })
})


