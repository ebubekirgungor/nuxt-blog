import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    value: String,
  }
);

export default mongoose.model("Option", schema, "options");