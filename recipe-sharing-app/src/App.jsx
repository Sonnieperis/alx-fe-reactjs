import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails'; // <-- make sure this file exists
import SearchBar from './components/SearchBar';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1>Recipe Sharing App</h1>
        <SearchBar />
        <AddRecipeForm />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
