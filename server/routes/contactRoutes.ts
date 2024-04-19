import express from "express"
import { addContactAsSiteLead, createContact, deleteContact, getUserContacts, removeContactAsSiteLead, updateContact } from "../controllers/contactController"
import { checkAuth, validateId } from "../middlewares"



export const router = express.Router()

router.get("/",checkAuth,getUserContacts)
router.post("/",checkAuth,createContact)
router.delete("/:id",validateId,deleteContact)
router.patch("/:id",validateId,updateContact)
router.post("/add-lead",addContactAsSiteLead)
router.post("/remove-lead",removeContactAsSiteLead)
