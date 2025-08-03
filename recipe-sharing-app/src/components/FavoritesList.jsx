import { useRecipeStore } from './recipeStore';

function FavoritesList() {
  const favorites = useRecipeStore(state =>
    state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    )
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;
