import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewComplaint from './pages/NewComplaint'
import MyComplaints from './pages/MyComplaints'
import AdminComplaints from './pages/AdminComplaints'
import Announcements from './pages/Announcements'
import Community from './pages/Community'
import Navbar from './components/Navbar'

function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loading"><div className="spinner" /></div>
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

function AppShell({ children }) {
  return <div className="app-shell"><Navbar /><main className="main-content">{children}</main></div>
}

function Home() {
  const { user } = useAuth()
  return <Navigate to={user?.role === 'incharge' ? '/complaints' : '/my-complaints'} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/new-complaint" element={<PrivateRoute role="resident"><AppShell><NewComplaint /></AppShell></PrivateRoute>} />
        <Route path="/my-complaints" element={<PrivateRoute role="resident"><AppShell><MyComplaints /></AppShell></PrivateRoute>} />
        <Route path="/complaints" element={<PrivateRoute role="incharge"><AppShell><AdminComplaints /></AppShell></PrivateRoute>} />
        <Route path="/announcements" element={<PrivateRoute><AppShell><Announcements /></AppShell></PrivateRoute>} />
        <Route path="/community" element={<PrivateRoute><AppShell><Community /></AppShell></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
