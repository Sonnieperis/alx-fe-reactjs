import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setRecipes)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recipe Sharing Platform</h1>
          <p className="text-gray-600 mt-1">Browse community-submitted recipes.</p>
          <div className="mt-4">
  <Link
    to="/new"
    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
  >
    + Add Recipe
  </Link>
</div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Failed to load recipes: {error}
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-xl shadow transition duration-300 ease-out
                         hover:shadow-lg transform hover:-translate-y-1"
            >
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-40 md:h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{r.title}</h2>
                <p className="mt-2 text-sm md:text-base text-gray-600">{r.summary}</p>

                <Link
                  to={`/recipe/${r.id}`}
                  className="inline-flex items-center mt-4 font-medium text-blue-600 hover:text-blue-700 transition"
                  aria-label={`View details for ${r.title}`}
                >
                  View details <span className="ml-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
