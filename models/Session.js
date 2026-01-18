import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  uid: String,
  flowId: String,
  answers: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
