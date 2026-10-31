const classes = {
  Pending: 'badge-pending',
  'In Progress': 'badge-inprogress',
  Resolved: 'badge-resolved',
}

export default function StatusBadge({ status }) {
  return <span className={`badge ${classes[status] || 'badge-neutral'}`}>{status}</span>
}
