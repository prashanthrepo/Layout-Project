import express from "express"
import { createContact, deleteContact, getUserContacts, updateContact } from "../controllers/contactController"
import { checkAuth } from "../middlewares"



export const router = express.Router()

router.get("/",checkAuth,getUserContacts)
router.post("/",checkAuth,createContact)
router.delete("/:id",deleteContact)
router.patch("/:id",updateContact)
