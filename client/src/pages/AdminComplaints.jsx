import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { complaintApi } from "../api";
import StatusBadge from "../components/StatusBadge";
import { STATUSES } from "../constants";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  const sortedComplaints = [...complaints].sort(
    (a, b) => (priorityOrder[a.priorityLevel] ?? 2) - (priorityOrder[b.priorityLevel] ?? 2),
  );

  useEffect(() => {
    complaintApi
      .list()
      .then(setComplaints)
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  async function changeStatus(id, status) {
    setUpdating(id);
    try {
      const { complaint } = await complaintApi.updateStatus(id, status);
      setComplaints((items) =>
        items.map((item) => (item.id === id ? complaint : item)),
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

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>All complaints</h1>
          <p className="page-subtitle">Update each ticket as it is handled.</p>
        </div>
      </div>
      <div className="card table-wrap">
        {complaints.length === 0 ? (
          <p className="empty">No complaints have been submitted.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Resident</th>
                <th>Room</th>
                <th>Topic</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Current status</th>
                <th>Update status</th>
              </tr>
            </thead>
            <tbody>
              {sortedComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.profiles?.name || "—"}</td>
                  <td>{complaint.profiles?.room_number || "—"}</td>
                  <td>
                    <div>{complaint.topic}</div>
                    <div className="tiny faint">{complaint.details}</div>
                  </td>
                  <td>{complaint.category}</td>
                  <td>{complaint.priorityLevel || "Low"}</td>
                  <td>
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td>

                    <select
                      className="input status-select"
                      value={complaint.status}
                      disabled={updating === complaint.id}
                      onChange={(event) =>
                        changeStatus(complaint.id, event.target.value)
                      }
                    >
                      {STATUSES.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
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
