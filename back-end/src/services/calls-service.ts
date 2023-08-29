import Call from "../models/calls";
import { CallI } from "../types";

export const getCall = async (name: string): Promise<CallI[]> => {
  return await Call.find({ name });
};

export const getNumCalls = async (name: string): Promise<number> => {
  return await Call.count({ name });
};

export const addCall = async (name: string): Promise<CallI> => {
  const call = new Call({ name });
  return await call.save();
};
