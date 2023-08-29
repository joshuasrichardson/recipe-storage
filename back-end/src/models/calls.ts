import mongoose from "mongoose";
import { CallModel } from "../types";

const callSchema = new mongoose.Schema<CallModel>({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60,
  },
});

const Call = mongoose.model<CallModel>("Call", callSchema);

export default Call;
