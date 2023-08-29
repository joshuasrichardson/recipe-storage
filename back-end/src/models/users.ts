import mongoose from "mongoose";
import argon2 from "argon2";
import { UserModel } from "../types";

const userSchema = new mongoose.Schema<UserModel>({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  role: {
    type: String,
    default: "",
  },
  language: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre(/save/, async function (next) {
  if (!(this as any).isModified("password")) return next();

  try {
    const hash = await argon2.hash((this as any).password);
    (this as any).password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
