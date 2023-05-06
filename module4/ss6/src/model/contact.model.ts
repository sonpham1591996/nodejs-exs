import { Document, Model, Schema, model } from "mongoose";

interface Contact {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

interface IContactDocument
  extends Contact,
    Document<string | Schema.Types.ObjectId> {}

interface IContactModel extends Model<IContactDocument> {}

const contactSchema: Schema<IContactDocument, IContactModel> = new Schema<
  IContactDocument,
  IContactModel
>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

export const ContactModel = model<IContactDocument, IContactModel>(
  "contacts",
  contactSchema
);
