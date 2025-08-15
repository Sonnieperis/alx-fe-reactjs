import { useEffect, useState } from 'react';
import recipesData from '../data.json'; // import JSON from src

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Load data on mount
  useEffect(() => {
    // Using import keeps the file in /src as requested and still uses state/effect.
    setRecipes(recipesData);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recipe Sharing Platform</h1>
          <p className="text-gray-600 mt-1">Browse community-submitted recipes.</p>
        </header>

        {/* Responsive grid */}
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

                {/* Placeholder link for now; will wire up with Router in a later task */}
                <a
                  href={`/recipe/${r.id}`}
                  className="inline-flex items-center mt-4 font-medium text-blue-600 hover:text-blue-700 transition"
                  aria-label={`View details for ${r.title}`}
                >
                  View details <span className="ml-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
