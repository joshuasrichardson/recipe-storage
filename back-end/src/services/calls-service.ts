import Call from "../models/calls";

export const getCall = async (name) => {
  return await Call.find({ name });
};

export const getNumCalls = async (name) => {
  return (await getCall(name)).length;
};

export const addCall = async (name) => {
  const call = new Call({ name });
  return await call.save();
};
