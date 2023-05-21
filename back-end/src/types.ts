import { Request } from "express";
import mongoose, { ObjectId } from "mongoose";

export interface user extends mongoose.Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: {
    type: string;
    default: "";
  };
  language: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface GetUserAuthInfoRequest extends Request {
  user: user;
  session: { userID: any };
  file: { filename: string };
}
