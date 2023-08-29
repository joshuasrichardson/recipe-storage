import { ErrorMessage } from "../constants";
import User from "../models/users";
import { UserI, UserModel } from "../types";

export const createUser = async (newUser: UserI): Promise<UserModel> => {
  if (!newUser || !newUser.username || !newUser.password) {
    throw new Error(ErrorMessage.MISSING_CREDS);
  }

  const existingUser = await User.findOne({
    username: newUser.username,
  });
  if (existingUser) throw new Error(ErrorMessage.USER_EXISTS);

  const user = new User(newUser);
  await user.save();
  return user;
};

export const updateUser = async (user: UserI): Promise<UserI> => {
  if (!user) throw new Error(ErrorMessage.USER_REQUIRED);
  return await User.findByIdAndUpdate(user._id, user);
};

export const login = async (
  username: string,
  password: string
): Promise<UserI> => {
  if (!username || !password) throw new Error(ErrorMessage.MISSING_CREDS);
  const user = await User.findOne({ username });
  if (!user) throw new Error(ErrorMessage.INCORRECT_CREDS);
  if (!(await user.comparePassword(password)))
    throw new Error(ErrorMessage.INCORRECT_CREDS);
  return user;
};
