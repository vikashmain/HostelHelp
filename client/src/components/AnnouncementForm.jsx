import { useState } from "react";
import toast from "react-hot-toast";
import { announcementApi } from "../api";

export default function AnnouncementForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await announcementApi.create({ title, content });
      setTitle("");
      setContent("");
      onCreated();
      toast.success("Announcement posted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2 className="form-title">Post announcement</h2>
      <div className="field">
        <label htmlFor="announcement-title">Title</label>
        <input
          id="announcement-title"
          className="input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="announcement-content">Content</label>
        <textarea
          id="announcement-content"
          className="input"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
          rows="4"
        />
      </div>
      <button className="btn btn-primary" disabled={saving}>
        {saving ? "Posting..." : "Post announcement"}
      </button>
    </form>
  );
}
