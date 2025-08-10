import React from 'react';

const UserCard = ({ user }) => {
  if (!user) return null;
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, maxWidth: 480 }}>
      <img src={user.avatar_url} alt={user.login} style={{ width: 100, borderRadius: '50%' }} />
      <h2>{user.name || user.login}</h2>
      <p><strong>Username:</strong> {user.login}</p>
      <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">View GitHub Profile</a>
    </div>
  );
};

export default UserCard;
