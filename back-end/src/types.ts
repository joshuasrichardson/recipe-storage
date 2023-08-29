import { Request, Router } from "express";
import mongoose, { ObjectId } from "mongoose";

export type SupportedLanguage = "en" | "ja";

export interface UserI {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: {
    type: string;
    default: string;
  };
  language: SupportedLanguage;
}

export interface UserModel extends UserI {
  createdAt: {
    type: Date;
    default: Date;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface CallI {
  id: string;
  name: string;
}

export interface CallModel extends CallI {
  createdAt: {
    type: Date;
    default: Date;
    expires: number;
  };
}

export interface ContainersI {
  id: string;
  user: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
  containers: Array<string>;
}

export interface ContainersModel extends ContainersI {
  user: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
}

export interface ProductI {
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  tags: Array<string>;
  amount: number;
  unit: string;
  src?: string;
  avgDaysToExpiration?: number;
}

export type ProductModel = ProductI & mongoose.Document;

export interface RecipeI extends mongoose.Document {
  id: ObjectId;
  user: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
  name: string;
  minutes: number;
  materials: Array<string>;
  numServings: number;
  ingredients: Array<string>;
  steps: Array<string>;
  description: string;
  link: string;
  generatedWith: Array<string>;
  added: {
    type: Date;
    default: Date;
  };
  wasAutogenerated: {
    type: boolean;
    default: false;
  };
  language: {
    type: SupportedLanguage;
    default: SupportedLanguage;
  };
}

export interface ItemI extends mongoose.Document {
  id: ObjectId;
  user: {
    type: mongoose.Types.ObjectId;
    ref: string;
  };
  code: string;
  name: string;
  brand: string;
  description: string;
  container: string;
  expiration: Date;
  tags: Array<string>;
  amount: number;
  unit: string;
  src: string;
  added: {
    type: Date;
    default: Date;
  };
  deleted: boolean;
}

export interface VerifiedUserRequest extends Request {
  user: UserI;
  session: { userID: any };
  file: { filename: string };
}

export interface Route {
  path: string;
  router: Router;
}

export interface File {
  filename: string;
}
