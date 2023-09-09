import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

schema.plugin(bcrypt);
export default mongoose.model("User", schema, "users");