import { Request, Response } from "express";
import { OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config";
import ContactModel from "../models/contactModel";

const createContact = async (req: Request, res: Response) => {
  const reqBody = { ...req.body, user: req.userId };
  const contact = await ContactModel.create(reqBody);
  await contact?.save();
  res.sendSuccess(contact, 201);
};

const getUserContacts = async (req: Request, res: Response) => {
  const contacts = await ContactModel.find({ user: req.userId });
  res.sendSuccess(contacts);
};

const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await ContactModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.sendSuccess(contact);
};

const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await ContactModel.findOneAndDelete({ _id: id });
    contact && res.sendSuccess({}, 200);
    !contact && res.sendError(OBJECT_NOT_FOUND);
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

export { getUserContacts, createContact, updateContact, deleteContact };
