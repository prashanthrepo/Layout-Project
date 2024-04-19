import { Request, Response } from "express";
import {
  OBJECT_ALREADY_EXISTS,
  OBJECT_NOT_FOUND,
  SOMETHING_WENT_WRONG,
} from "../config";
import ContactModel from "../models/contactModel";
import siteModel from "../models/siteModel";
import leadModel from "../models/leadModel";

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
  const contact = await ContactModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  await contact?.save();

  !contact && res.sendError(OBJECT_NOT_FOUND);
  contact && res.sendSuccess(contact);
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

const addContactAsSiteLead = async (req: Request, res: Response) => {
  const { contactId, siteId } = req.body;

  try {
    const site = await siteModel.findById(siteId);
    if (!site) {
      return res.sendError(OBJECT_NOT_FOUND, { message: "Site not found" });
    }
    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res.sendError(OBJECT_NOT_FOUND, { message: "Contact not found" });
    }

    const exists = site.leads.includes(contactId);

    if (!exists) {
      const lead = await leadModel.create(req.body);
      await lead?.save();

      site.leads.push(lead._id);
      site?.save();
      res.sendSuccess(site);
    } else {
      res.sendError(OBJECT_ALREADY_EXISTS);
    }

    
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

const removeContactAsSiteLead = async (req: Request, res: Response) => {
  const { contactId, siteId } = req.body;
  try {
    const site = await siteModel.findById(siteId);
    if (!site) {
      return res.sendError(OBJECT_NOT_FOUND, { message: "Site not found" });
    }
    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res.sendError(OBJECT_NOT_FOUND, { message: "Contact not found" });
    }

    const lead = await leadModel.findOne({ contactId, siteId });

    if (lead) {
      const index = site.leads.indexOf(lead._id);
      if (index !== -1) {
        // If the contact is found in the leads array
        site.leads.splice(index, 1); // Remove the contact from the leads array
        await site.save(); // Save the updated site
        res.sendSuccess(site); // Respond with success
      } else {
        res.sendError(OBJECT_NOT_FOUND, {
          message: "Lead not found in the site",
        });
      }
    }
  } catch (error) {
    res.sendError(SOMETHING_WENT_WRONG, { error });
  }
};

export {
  removeContactAsSiteLead,
  getUserContacts,
  createContact,
  updateContact,
  deleteContact,
  addContactAsSiteLead,
};
