import express, { Request, Response } from "express"

export const router = express.Router()

router.post("/me", (req: Request, res: Response) => {
    const { user } = req.body

    const response = {
        id: `${user}_583c3ac3f38e84297c002546`,
        email: `${user}-email@gmail.com`,
        name: `${user}-name`,
        role: user.charAt(0).toUpperCase() + user.slice(1),
    }

    res.json(response)
})

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "hello" })
})
