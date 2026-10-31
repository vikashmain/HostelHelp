import { NavLink, useNavigate } from "react-router-dom";
import { FileText, Globe, LogOut, Megaphone, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isIncharge = user?.role === "incharge";

  function handleSignOut() {
    signOut();
    navigate("/login");
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <div className="sidebar-role">
          {isIncharge ? "Incharge" : "Resident"}
        </div>
      </div>
      <div className="nav">
        {isIncharge ? (
          <>
            <NavLink to="/complaints" className="nav-link">
              <FileText size={16} /> All complaints
            </NavLink>
            <NavLink to="/announcements" className="nav-link">
              <Megaphone size={16} /> Announcements
            </NavLink>
            <NavLink to="/community" className="nav-link">
              <Globe size={16} /> Community
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/new-complaint" className="nav-link">
              <PlusCircle size={16} /> New complaint
            </NavLink>
            <NavLink to="/my-complaints" className="nav-link">
              <FileText size={16} /> My complaints
            </NavLink>
            <NavLink to="/announcements" className="nav-link">
              <Megaphone size={16} /> Announcements
            </NavLink>
            <NavLink to="/community" className="nav-link">
              <Globe size={16} /> Community
            </NavLink>
          </>
        )}
      </div>
      <div className="sidebar-footer">
        <div className="user-row">
          <div className="avatar">{user?.name?.[0]?.toUpperCase() || "?"}</div>
          <div>
            <div className="user-name">{user?.name}</div>
            <div className="tiny faint">
              {user?.room_number ? `Room ${user.room_number}` : "Incharge"}
            </div>
          </div>
        </div>
        <button
          className="btn btn-ghost btn-block sign-out"
          onClick={handleSignOut}
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </nav>
  );
}
