import mongoose from "mongoose";

const OutputSchema = new mongoose.Schema({
  sessionId: String,
  checklistItems: [String],
  officialLinks: [{ title: String, url: String }],
  questionsToAsk: [String],
  summaryText: String,
  audioUrl: String,
});

export default mongoose.models.Output || mongoose.model("Output", OutputSchema);
