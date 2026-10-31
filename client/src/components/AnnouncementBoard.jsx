import { useEffect, useState } from 'react'
import { announcementApi } from '../api'

export default function AnnouncementBoard({ refreshKey }) {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    announcementApi.list()
      .then(setAnnouncements)
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false))
  }, [refreshKey])

  if (loading) return <div className="page-loading"><div className="spinner" /></div>
  if (announcements.length === 0) return <div className="card empty">No announcements yet.</div>

  return (
    <div className="announcement-list">
      {announcements.map((announcement) => (
        <article key={announcement.id} className="card announcement-card">
          <h2>{announcement.title}</h2>
          <p className="announcement-content">{announcement.content}</p>
          <p className="tiny faint">Posted by {announcement.created_by?.name || 'Incharge'} on {new Date(announcement.created_at).toLocaleDateString('en-IN')}</p>
        </article>
      ))}
    </div>
  )
}
