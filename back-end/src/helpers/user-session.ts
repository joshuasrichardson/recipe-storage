import { Response } from "express";
import { ErrorMessage } from "../constants";
import User from "../models/users";
import { VerifiedUserRequest, UserModel } from "../types";

const getUserIfValid = async (userId: string): Promise<UserModel | null> => {
  try {
    if (!userId) return null;
    return await User.findOne({ _id: userId });
  } catch (err) {
    return null;
  }
};

export const checkUserValidity = async (
  req: VerifiedUserRequest,
  res: Response,
  next: () => void
) => {
  const user = await getUserIfValid(req.session.userID);
  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(403).send({
      message: ErrorMessage.NOT_LOGGED_IN,
    });
  }
};
