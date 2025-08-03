import React from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Recipe Sharing App</h1>
      
      <AddRecipeForm />
      <RecipeList />
      
      <FavoritesList />
      <RecommendationsList />
    </div>
  );
}

export default App;
