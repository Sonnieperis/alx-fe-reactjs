import React from 'react';
import { useRecipeStore } from './recipeStore';

function SearchBar() {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
    </div>
  );
}

export default SearchBar;
