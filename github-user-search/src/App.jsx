// src/App.jsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { fetchGitHubUser } from './services/github';

export default function App() {
  const [userData, setUserData] = useState(null);

  const handleSearch = async (username) => {
    try {
      const data = await fetchGitHubUser(username);
      setUserData(data);
    } catch {
      setUserData(null);
      alert('User not found or API error');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      <UserCard user={userData} />
    </div>
  );
}
