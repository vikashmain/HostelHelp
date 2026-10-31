import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roomNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // Everyone signs up as a resident. Incharge accounts are promoted by the
  // admin directly in the database (see README), never from the browser.
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const error = await signUp({
      email: form.email,
      password: form.password,
      name: form.name,
      roomNumber: form.roomNumber.toUpperCase(),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created");
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-heading">
          <Logo />
          <div className="muted mt">Create your resident account</div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="field">
              <label htmlFor="room">Room number</label>
              <input
                id="room"
                className="input"
                placeholder="e.g. B204"
                value={form.roomNumber}
                onChange={(e) => set("roomNumber", e.target.value)}
                required
                pattern="[A-Ea-e][0-9]{1,4}"
                title="Wing letter (A to E) followed by the room number, e.g. B204"
              />
              <span className="tiny faint">
                Wing letter (A–E) followed by the room number.
              </span>
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create account"}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
