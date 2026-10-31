// complaintController.js
import { CATEGORIES, Complaint, STATUSES } from "../models/index.js";
import { complaintOut, fail, id, validComplaint } from "../utils/response.js";
import { analyzePriority } from "../services/priorityService.js";
import { createEmbedding } from "../services/embeddingService.js";

function cosineSimilarity(a, b) {
  if (a.length !== b.length || !a.length) return 0;
  let dot = 0;
  let aMagnitude = 0;
  let bMagnitude = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    aMagnitude += a[index] ** 2;
    bMagnitude += b[index] ** 2;
  }
  return aMagnitude && bMagnitude ? dot / Math.sqrt(aMagnitude * bMagnitude) : 0;
}

export async function create(req, res) {
  if (!validComplaint(req.body, CATEGORIES)) {
    return fail(res, 400, "Please provide a topic, category, and detailed description.");
  }
  
  let priorityLevel = "Low";
  let embedding = [];
  try {
    priorityLevel = await analyzePriority(req.body.topic, req.body.details);
  } catch (error) {
    console.error("Priority Service Error:", error.message);
  }
  try {
    embedding = await createEmbedding(req.body.topic, req.body.details);
  } catch (error) {
    console.error("Embedding Service Error:", error.message);
  }

  const complaint = await Complaint.create({
    user_id: req.user._id,
    topic: req.body.topic.trim(),
    details: req.body.details.trim(),
    category: req.body.category,
    priorityLevel,
    embedding,
    isPublic: req.body.isPublic === true,
  });
  return res.status(201).json({ id: complaint.id });
}

export async function checkSimilar(req, res) {
  if (!validComplaint({ ...req.body, category: CATEGORIES[0] }, CATEGORIES)) {
    return fail(res, 400, "Please provide a topic and detailed description.");
  }

  let embedding;
  try {
    embedding = await createEmbedding(req.body.topic, req.body.details);
  } catch (error) {
    console.error("Embedding Service Error:", error.message);
    return res.json({ match: null });
  }

  const complaints = await Complaint.find({
    status: { $ne: "Resolved" },
    embedding: { $exists: true, $ne: [] },
    $or: [{ isPublic: true }, { user_id: req.user._id }],
  }).populate("user_id", "name room_number role");

  const match = complaints
    .map((complaint) => ({ complaint, similarity: cosineSimilarity(embedding, complaint.embedding) }))
    .filter(({ similarity }) => similarity > 0.8)
    .sort((a, b) => b.similarity - a.similarity)[0];

  return res.json(match ? {
    match: {
      ...complaintOut(match.complaint, false),
      similarity: match.similarity,
      isOwner: id(match.complaint.user_id) === id(req.user._id),
    },
  } : { match: null });
}

function publicComplaintOut(complaint, userId) {
  const upvotes = complaint.upvotes || [];
  return {
    ...complaintOut(complaint),
    upvoteCount: upvotes.length,
    hasUpvoted: upvotes.some((upvoter) => id(upvoter) === id(userId)),
  };
}

export async function getPublicComplaints(req, res) {
  const complaints = await Complaint.find({ isPublic: true })
    .populate("user_id", "name room_number role")
    .sort({ created_at: -1 });
  return res.json(complaints.map((complaint) => publicComplaintOut(complaint, req.user._id)));
}

export async function toggleUpvote(req, res) {
  const filter = {
    _id: req.params.id,
    isPublic: true,
    user_id: { $ne: req.user._id },
  };

  const added = await Complaint.findOneAndUpdate(
    { ...filter, upvotes: { $ne: req.user._id } },
    { $addToSet: { upvotes: req.user._id } },
    { new: true },
  );
  if (added) return res.json({ upvoted: true, upvoteCount: added.upvotes.length, message: "Upvote added" });

  const removed = await Complaint.findOneAndUpdate(
    { ...filter, upvotes: req.user._id },
    { $pull: { upvotes: req.user._id } },
    { new: true },
  );
  if (removed) return res.json({ upvoted: false, upvoteCount: removed.upvotes.length, message: "Upvote removed" });

  return fail(res, 403, "You can only upvote another resident's public complaint.");
}

export async function list(req, res) {
  const mine = req.query.mode === "mine";
  if (!mine && req.user.role !== "incharge") return fail(res, 403, "Only incharges can view all complaints.");
  const filter = mine ? { user_id: req.user._id } : {};
  const complaints = await Complaint.find(filter)
    .populate("user_id", "name room_number role")
    .sort({ created_at: -1 });
  return res.json(complaints.map((complaint) => complaintOut(complaint, !mine)));
}

export async function changeStatus(req, res) {
  if (!STATUSES.includes(req.body.status)) return fail(res, 400, "Invalid status.");
  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  ).populate("user_id", "name room_number role");
  if (!complaint) return fail(res, 404, "Complaint not found.");
  return res.json({ complaint: complaintOut(complaint, true) });
}
