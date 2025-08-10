// src/App.jsx
import React from 'react';
import Search from './components/Search';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>GitHub User Search</h1>
      <Search />
    </div>
  );
}
