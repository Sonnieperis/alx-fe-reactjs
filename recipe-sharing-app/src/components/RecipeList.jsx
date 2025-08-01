import { useRecipeStore } from '../recipeStore';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
