import { Announcement } from "../models/index.js";
import { fail, publicUser } from "../utils/response.js";

function announcementOut(announcement) {
  return {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    created_at: announcement.created_at,
    created_by: announcement.created_by?.name ? publicUser(announcement.created_by) : undefined,
  };
}

export async function createAnnouncement(req, res) {
  const { title, content } = req.body;
  if (!title?.trim() || !content?.trim()) return fail(res, 400, "Title and content are required.");

  const announcement = await Announcement.create({
    title: title.trim(),
    content: content.trim(),
    created_by: req.user._id,
  });
  await announcement.populate("created_by", "name");
  return res.status(201).json({ announcement: announcementOut(announcement) });
}

export async function listAnnouncements(_req, res) {
  const announcements = await Announcement.find()
    .populate("created_by", "name")
    .sort({ created_at: -1 });
  return res.json(announcements.map(announcementOut));
}
