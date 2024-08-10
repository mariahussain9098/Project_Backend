import { model, Schema } from "mongoose";

const RefreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiry: { type: Date, required: true },
});

export const RefreshToken = model("RefreshToken", RefreshTokenSchema);
