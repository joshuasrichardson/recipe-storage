import Containers from "../models/containers";

export const getContainers = async (user) => {
  return await Containers.find({
    user,
  }).sort({
    containers: 1,
  });
};

export const addContainer = async (user, newContainer) => {
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
