import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipeId = Number(id);
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    setStatus('loading');
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((all) => {
        const found = all.find((r) => r.id === recipeId);
        if (!found) {
          setStatus('error');
        } else {
          setRecipe(found);
          setStatus('ready');
        }
      })
      .catch(() => setStatus('error'));
  }, [recipeId]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">Loading recipe…</p>
        </div>
      </main>
    );
  }

  if (status === 'error' || !recipe) {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 mb-6">
            Recipe not found.
          </div>
          <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>

        <div className="mt-4 bg-white rounded-xl shadow overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 md:h-80 object-cover"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{recipe.title}</h1>
            <p className="mt-2 text-gray-600">{recipe.summary}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredients */}
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
                <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700">
                  {recipe.ingredients?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900">Instructions</h2>
                <ol className="mt-3 list-decimal list-inside space-y-2 text-gray-700">
                  {recipe.instructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
