import { ErrorMessage } from "../constants";
import User from "../models/users";

const getUserIfValid = async (userId: string) => {
  try {
    if (!userId) return null;
    return await User.findOne({ _id: userId });
  } catch (err) {
    return null;
  }
};

export const checkUserValidity = async (req, res, next) => {
  const user = await getUserIfValid(req?.session?.userID);
  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(403).send({
      message: ErrorMessage.NOT_LOGGED_IN,
    });
  }
};
