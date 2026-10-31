import mongoose from "mongoose";
import { CATEGORIES, STATUSES } from "./constants.js";

const complaintSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true, trim: true },
  details: { type: String, required: true, trim: true },
  category: { type: String, enum: CATEGORIES, required: true },
  priorityLevel: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
  embedding: { type: [Number], default: [] },
  isPublic: { type: Boolean, default: false },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: STATUSES, default: "Pending" },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export default mongoose.model("Complaint", complaintSchema);
