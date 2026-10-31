import { useEffect, useState } from "react";
import { complaintApi } from "../api";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function CommunityBoard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    complaintApi
      .listPublic()
      .then(setComplaints)
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  async function toggleUpvote(id) {
    setUpdating(id);
    try {
      const result = await complaintApi.toggleUpvote(id);
      setComplaints((items) =>
        items.map((complaint) =>
          complaint.id === id
            ? {
                ...complaint,
                hasUpvoted: result.upvoted,
                upvoteCount: result.upvoteCount,
              }
            : complaint,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(null);
    }
  }

  if (loading)
    return (
      <div className="page-loading">
        <div className="spinner" />
      </div>
    );
  if (complaints.length === 0)
    return <div className="card empty">No public complaints yet.</div>;

  return (
    <div className="community-list">
      {complaints.map((complaint) => {
        const isOwner = complaint.profiles?.id === user?.id;
        return (
          <article key={complaint.id} className="card community-card">
            <div className="community-header">
              <h2>{complaint.topic}</h2>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="community-details">{complaint.details}</p>
            <div className="community-footer">
              <p className="tiny faint">
                {complaint.category} · Posted by{" "}
                {complaint.profiles?.name || "Resident"}
              </p>
              {isOwner ? (
                <span className="tiny faint">
                  Your complaint · {complaint.upvoteCount} upvotes
                </span>
              ) : (
                <button
                  className={`btn btn-sm ${complaint.hasUpvoted ? "btn-secondary" : "btn-primary"}`}
                  onClick={() => toggleUpvote(complaint.id)}
                  disabled={updating === complaint.id}
                >
                  {complaint.hasUpvoted ? "Remove upvote" : "Upvote"} (
                  {complaint.upvoteCount})
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
