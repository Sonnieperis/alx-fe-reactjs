import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h2>Home</h2>
      <p>Demo of nested, dynamic and protected routes.</p>

      <div style={{ margin: "1rem 0" }}>
        <strong>Auth:</strong>{" "}
        {user ? (
          <>
            Logged in as <em>{user.name}</em> —{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => login("muthoni")}>Login</button>
        )}
      </div>

      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/">Home</Link>
        <Link to="/posts/1">View Post 1 (dynamic)</Link>
        <Link to="/posts/42">View Post 42 (dynamic)</Link>
        <Link to="/profile">Profile (protected)</Link>
        <Link to="/profile/details">Profile → Details</Link>
        <Link to="/profile/settings">Profile → Settings</Link>
      </nav>
    </div>
  );
}
