import { Request, Response } from "express";
import { ContactModel } from "../model/contact.model";

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await ContactModel.find();
  return res.render("list.ejs", { contacts: contacts, errorMsg: undefined });
};

export const getCreationForm = (req: Request, res: Response) => {
  return res.render("create.ejs", { errorMsg: undefined });
};

export const createContact = async (req: Request, res: Response) => {
  const body = req.body;
  if (
    !body ||
    !body.name ||
    !body.address ||
    !body.email ||
    !body.phoneNumber
  ) {
    return res.render("create.ejs", {
      errorMsg: "The data is invalid",
    });
  }

  const oldContact = await ContactModel.findOne({
    $or: [
      {
        name: body.name,
      },
      {
        email: body.email,
      },
      {
        phoneNumber: body.phoneNumber,
      },
    ],
  });

  if (oldContact) {
    return res.render("create.ejs", {
      errorMsg: "The contact is available",
    });
  }

  await ContactModel.create(body);

  return res
    .writeHead(302, {
      Location: "/contacts",
    })
    .send();
};

export const getUpdateForm = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.render("list.ejs", { errorMsg: "Invalid id" });
  }

  const contact = await ContactModel.findById(id);
  if (!contact) {
    return res.render("list.ejs", { errorMsg: "Not found contact" });
  }

  return res.render("update.ejs", { contact, errorMsg: undefined });
};

export const updateContact = async (req: Request, res: Response) => {
  const body = req.body;
  if (
    !body ||
    !body.name ||
    !body.address ||
    !body.email ||
    !body.phoneNumber
  ) {
    return res.render("create.ejs", {
      errorMsg: "The data is invalid",
    });
  }

  const oldContact = await ContactModel.findById(body.id);
  if (!oldContact) {
    return res.render("update.ejs", {
      errorMsg: "Not found contact",
    });
  }

  let filter = [];
  if (req.body.name !== oldContact.name) {
    filter.push({
      name: req.body.name,
    });
  }

  if (req.body.email !== oldContact.email) {
    filter.push({
      email: req.body.email,
    });
  }

  if (req.body.phoneNumber !== oldContact.phoneNumber) {
    filter.push({
      phoneNumber: req.body.phoneNumber,
    });
  }

  if (filter.length > 0) {
    const oldContact = await ContactModel.findOne({
      $or: filter,
    });
    if (oldContact) {
      return res.render("update.ejs", {
        errorMsg: "The email or phoneNumber is available",
      });
    }
  }

  oldContact.name = body.name;
  oldContact.address = body.address;
  oldContact.email = body.email;
  oldContact.phoneNumber = body.phoneNumber;

  await oldContact.save();
  return res
    .writeHead(302, {
      Location: "/contacts",
    })
    .send();
};

export const deleteContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    // @ts-ignore
    return res.render("list.ejs", { errorMsg: "Invalid id" });
  }

  await ContactModel.findOneAndDelete({ _id: id as string });
  return res
    .writeHead(302, {
      Location: "/contacts",
    })
    .send();
};
