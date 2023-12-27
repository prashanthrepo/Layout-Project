import cors from "cors"
import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import {
    baseRoutes,
    layoutRoutes,
    leadRoutes,
    siteRoutes,
    tokenRoutes,
    transactionRoutes,
} from "./routes"

dotenv.config()
const app: Express = express()
const port: string = process.env.PORT as string | "4000"
app.use(cors())
app.use(express.json())

// routes
app.use("/layouts", layoutRoutes)
app.use("/transactions", transactionRoutes)
app.use("/sites", siteRoutes)
app.use("/leads", leadRoutes)
app.use("/leads", leadRoutes)
app.use("/tokens", tokenRoutes)
app.use("/", baseRoutes)

mongoose
    .connect(process.env.MONGO_URI as string, {})
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to DB, listening on ${port} ✅`)
        })
    })
    .catch(error => {
        console.log("error ===", error)
    })
