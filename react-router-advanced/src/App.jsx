// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Profile from "./components/Profile";

// Dynamic route component
function BlogPost() {
  const { id } = useParams();
  return (
    <div>
      <h2>Blog Post {id}</h2>
      <p>This is the content for blog post with ID: {id}</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/blog/1">Blog Post 1</Link>
          </li>
          <li>
            <Link to="/blog/2">Blog Post 2</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
