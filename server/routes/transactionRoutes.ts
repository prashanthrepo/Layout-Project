import express from "express"
import { createTransaction } from "../controllers/transactionController"

export const router = express.Router()

router.post("/", createTransaction)
