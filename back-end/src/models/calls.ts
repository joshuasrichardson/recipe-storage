import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60,
  },
});

const Call = mongoose.model("Call", callSchema);

export default Call;
