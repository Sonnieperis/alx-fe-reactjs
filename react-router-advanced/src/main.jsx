import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import PostDetail from "./components/PostDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
          <h1>React Router Advanced</h1>

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Dynamic route */}
            <Route path="/posts/:postId" element={<PostDetail />} />

            {/* Protected + Nested routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfileDetails />} />
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<div>404 — Not Found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
