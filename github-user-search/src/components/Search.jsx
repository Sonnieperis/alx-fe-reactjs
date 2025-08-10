// src/components/Search.jsx
import { useState } from 'react';

export default function Search({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white shadow rounded"
    >
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
