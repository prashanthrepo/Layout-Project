import express from "express"
import {
    createTransaction,
    getSingleTransaction,
    getTransactions,
} from "../controllers/transactionController"

export const router = express.Router()

router.post("/", createTransaction)
router.get("/", getTransactions)
router.get("/:id", getSingleTransaction)
