import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    author: String,
    title: String,
    content: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Post", schema, "posts");