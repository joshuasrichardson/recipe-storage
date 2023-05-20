import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  role: {
    type: String,
    default: "",
  },
  language: String,
});

userSchema.pre(/save/, async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
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

const User = mongoose.model("User", userSchema);

export default User;
