import Containers from "../models/containers";
import { ContainersI, UserI } from "../types";

export const getContainers = async (user: UserI): Promise<ContainersI[]> => {
  return await Containers.find({
    user,
  }).sort({
    containers: 1,
  });
};

export const addContainer = async (
  user: UserI,
  newContainer: string
): Promise<void> => {
  const userContainers = await Containers.findOne({ user });
  if (!userContainers) {
    const newContainers = new Containers({
      user,
      containers: [newContainer],
    });
    await newContainers.save();
  } else if (!userContainers.containers.includes(newContainer)) {
    userContainers.containers.push(newContainer);
    await userContainers.save();
  }
};
