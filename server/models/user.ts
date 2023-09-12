import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface user extends mongoose.Document {
  email: String,
  password: String,
  name: String,
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true },
    name: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, password, (err: any, success: boolean | PromiseLike<boolean>) => {
          if (err) return reject(err);
          return resolve(success);
      });
  });
};

//schema.plugin(bcrypt);
export default mongoose.model<user>("User", schema, "users");
