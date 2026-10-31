import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AnnouncementBoard from '../components/AnnouncementBoard'
import AnnouncementForm from '../components/AnnouncementForm'

export default function Announcements() {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="page-narrow">
      <div className="page-header"><div><h1>Announcements</h1><p className="page-subtitle">Updates from the hostel incharge.</p></div></div>
      {user?.role === 'incharge' && <AnnouncementForm onCreated={() => setRefreshKey((key) => key + 1)} />}
      <AnnouncementBoard refreshKey={refreshKey} />
    </div>
  )
}
