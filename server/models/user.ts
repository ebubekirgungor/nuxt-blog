import mongoose from "mongoose";
//@ts-ignore
import bcrypt from "bcryptjs";

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  name: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    throw error;
  }
});

userSchema.pre<UserDocument | any>("updateOne", async function (next) {
  const data = this.getUpdate();
  if (!data) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    return next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model<UserDocument>("User", userSchema, "users");
