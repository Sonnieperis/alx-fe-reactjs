import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.filteredRecipes.length > 0 ? state.filteredRecipes : state.recipes);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
