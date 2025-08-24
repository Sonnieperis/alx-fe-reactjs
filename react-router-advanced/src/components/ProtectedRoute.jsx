import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // redirect to home (or /login) and preserve where we were going
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}
