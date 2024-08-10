import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is a required field"],
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Admin = model("Admin", adminSchema);
