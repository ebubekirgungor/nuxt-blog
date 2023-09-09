import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    description: { type: String, unique: true },
    post: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Post", schema, "posts");