import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { complaintApi } from "../api";
import { CATEGORIES } from "../constants";

export default function NewComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    topic: "",
    details: "",
    category: CATEGORIES[0],
    isPublic: false,
  });
  const [saving, setSaving] = useState(false);
  const [similarComplaint, setSimilarComplaint] = useState(null);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function createComplaint() {
    setSaving(true);
    try {
      await complaintApi.create(form);
      toast.success("Complaint submitted");
      navigate("/my-complaints");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const { match } = await complaintApi.checkSimilar(form);
      if (match) {
        setSimilarComplaint(match);
        return;
      }
      await createComplaint();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function joinSimilar() {
    try {
      await complaintApi.toggleUpvote(similarComplaint.id);
      toast.success("Joined the public complaint");
      navigate("/community");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="page-narrow">
      <div className="page-header">
        <div>
          <h1>New complaint</h1>
          <p className="page-subtitle">
            Tell the hostel team what needs attention.
          </p>
        </div>
      </div>
      <form className="card" onSubmit={submit}>
        <div className="field">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            className="input"
            value={form.topic}
            onChange={(event) => update("topic", event.target.value)}
            required
            minLength="3"
            maxLength="150"
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="input"
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
          >
            {CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            className="input"
            value={form.details}
            onChange={(event) => update("details", event.target.value)}
            required
            minLength="10"
            maxLength="2000"
            rows="6"
          />
        </div>
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(event) => update("isPublic", event.target.checked)}
          />
          Make this complaint public so other residents can upvote it.
        </label>
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Checking…" : "Submit complaint"}
        </button>
      </form>
      {similarComplaint && (
        <div className="card similar-complaint">
          <h2>Similar active complaint found</h2>
          <p><strong>{similarComplaint.topic}</strong></p>
          <p className="faint">{similarComplaint.details}</p>
          <div className="similar-actions">
            <button
              className="btn btn-secondary"
              onClick={similarComplaint.isPublic && !similarComplaint.isOwner ? joinSimilar : () => navigate(similarComplaint.isPublic ? "/community" : "/my-complaints")}
            >
              {similarComplaint.isPublic && !similarComplaint.isOwner ? "Join" : "View"}
            </button>
            <button className="btn btn-primary" onClick={createComplaint}>Submit Mine Anyway</button>
          </div>
        </div>
      )}
    </div>
  );
}
