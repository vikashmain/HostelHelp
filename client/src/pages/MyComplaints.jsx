import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { complaintApi } from "../api";
import StatusBadge from "../components/StatusBadge";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintApi
      .list(true)
      .then(setComplaints)
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="page-loading">
        <div className="spinner" />
      </div>
    );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>My complaints</h1>
          <p className="page-subtitle">
            Your submitted tickets and their current status.
          </p>
        </div>
        <Link to="/new-complaint" className="btn btn-primary">
          <Plus size={16} /> New complaint
        </Link>
      </div>
      <div className="card table-wrap">
        {complaints.length === 0 ? (
          <p className="empty">You have not submitted any complaints yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.topic}</td>
                  <td>{complaint.category}</td>
                  <td>
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td>
                    {new Date(complaint.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
