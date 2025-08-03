import { useRecipeStore } from './recipeStore';

function RecommendationsList() {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recommended Recipes</h2>
      <button onClick={generateRecommendations} style={{ marginBottom: '10px' }}>
        Generate Recommendations
      </button>

      {recommendations.length === 0 ? (
        <p>No recommendations available. Add some favorites to get suggestions.</p>
      ) : (
        recommendations.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecommendationsList;
