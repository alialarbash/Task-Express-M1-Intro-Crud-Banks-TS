import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    funds: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Account = model("Account", accountSchema);

export default Account;
