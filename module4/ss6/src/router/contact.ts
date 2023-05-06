import express from "express";
import {
  getContacts,
  getCreationForm,
  createContact,
  getUpdateForm,
  updateContact,
  deleteContact,
} from "../controller/contact.controller";

const contactRouter = express.Router();

contactRouter.get("", getContacts);

contactRouter.get("/creation-form", getCreationForm);

contactRouter.post("/create", createContact);

contactRouter.get("/:id/update-form", getUpdateForm);

contactRouter.post("/update", updateContact);

contactRouter.get("/:id/delete", deleteContact);

export default contactRouter;
