// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // empty = no error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = username.trim();
    if (!name) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const data = await fetchUserData(name);
      setUser(data);
    } catch (err) {
      // for 404 or network errors, show the required message
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
      setUsername(''); // clear input after search (optional)
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', width: 300 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '0.5rem 1rem' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {user && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 16,
          display: 'flex',
          gap: 16,
          alignItems: 'center'
        }}>
          <img src={user.avatar_url} alt={user.login} style={{ width: 96, borderRadius: '50%' }} />
          <div>
            <h2 style={{ margin: 0 }}>{user.name || user.login}</h2>
            <p style={{ margin: '4px 0' }}><strong>Username:</strong> {user.login}</p>
            <p style={{ margin: '4px 0' }}>{user.bio || 'No bio provided'}</p>
            <p style={{ margin: '4px 0' }}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">View GitHub profile</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
