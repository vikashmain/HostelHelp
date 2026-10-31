export const id = (value) => value?._id?.toString?.() || value?.toString?.() || value;

export const fail = (res, status, detail) => res.status(status).json({ detail });

export function publicUser(user) {
  return user && { id: id(user), name: user.name, room_number: user.room_number, role: user.role };
}

export function complaintOut(complaint, includePriority = true) {
  const raw = complaint.toObject ? complaint.toObject() : complaint;
  return {
    id: id(raw),
    topic: raw.topic,
    details: raw.details,
    category: raw.category,
    ...(includePriority ? { priorityLevel: raw.priorityLevel || "Low" } : {}),
    isPublic: !!raw.isPublic,
    status: raw.status,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
    profiles: raw.user_id?.name ? publicUser(raw.user_id) : undefined,
  };
}

export function validComplaint({ topic, details, category }, categories) {
  return typeof topic === "string" && topic.trim().length >= 3 && topic.trim().length <= 150
    && typeof details === "string" && details.trim().length >= 10 && details.trim().length <= 2000
    && categories.includes(category);
}
