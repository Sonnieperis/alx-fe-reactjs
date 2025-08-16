import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [touched, setTouched] = useState({ title: false, ingredients: false, steps: false });
  const [submitted, setSubmitted] = useState(false);

  const ingredients = useMemo(() =>
    ingredientsText
      .split(/\r?\n|,/)
      .map(s => s.trim())
      .filter(Boolean),
  [ingredientsText]);

  const steps = useMemo(() =>
    stepsText
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(Boolean),
  [stepsText]);

  const errors = {
    title: title.trim().length === 0 ? 'Title is required.' :
           title.trim().length < 3 ? 'Title must be at least 3 characters.' : '',
    ingredients: ingredients.length < 2 ? 'Enter at least two ingredients (one per line or comma-separated).' : '',
    steps: steps.length < 2 ? 'Enter at least two preparation steps (one per line).' : '',
  };

  const isValid = !errors.title && !errors.ingredients && !errors.steps;

  function markAllTouched() {
    setTouched({ title: true, ingredients: true, steps: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      markAllTouched();
      return;
    }
    // Demo “submission”: save to localStorage and show success
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      summary: steps[0]?.slice(0, 100) || '',
      image: 'https://via.placeholder.com/800x500',
      ingredients,
      instructions: steps,
    };
    const existing = JSON.parse(localStorage.getItem('newRecipes') || '[]');
    localStorage.setItem('newRecipes', JSON.stringify([newRecipe, ...existing]));
    setSubmitted(true);
    setTitle('');
    setIngredientsText('');
    setStepsText('');
    setTouched({ title: false, ingredients: false, steps: false });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add a New Recipe</h1>
          <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
        </div>

        {submitted && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            Recipe submitted locally (saved in your browser). You can wire this to a backend later.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-xl shadow p-4 sm:p-6 md:p-8"
        >
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Recipe Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, title: true }))}
              aria-invalid={Boolean(touched.title && errors.title)}
              aria-describedby="title-error"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                ${touched.title && errors.title ? 'border-red-400 focus:ring-red-500' : 'border-gray-300'}
              `}
              placeholder="e.g., Creamy Mushroom Pasta"
            />
            {touched.title && errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
              Ingredients <span className="font-normal text-gray-500">(one per line or comma-separated)</span>
            </label>
            <textarea
              id="ingredients"
              rows={5}
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, ingredients: true }))}
              aria-invalid={Boolean(touched.ingredients && errors.ingredients)}
              aria-describedby="ingredients-error"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                ${touched.ingredients && errors.ingredients ? 'border-red-400 focus:ring-red-500' : 'border-gray-300'}
              `}
              placeholder={`e.g.\nSpaghetti\nEggs\nParmesan\nBlack pepper`}
            />
            {touched.ingredients && errors.ingredients && (
              <p id="ingredients-error" className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div className="mb-8">
            <label htmlFor="steps" className="block text-sm font-medium text-gray-700">
              Preparation Steps <span className="font-normal text-gray-500">(one per line)</span>
            </label>
            <textarea
              id="steps"
              rows={6}
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, steps: true }))}
              aria-invalid={Boolean(touched.steps && errors.steps)}
              aria-describedby="steps-error"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                ${touched.steps && errors.steps ? 'border-red-400 focus:ring-red-500' : 'border-gray-300'}
              `}
              placeholder={`e.g.\nBoil pasta until al dente.\nSauté mushrooms with garlic.\nToss with cream and cheese.`}
            />
            {touched.steps && errors.steps && (
              <p id="steps-error" className="mt-1 text-sm text-red-600">{errors.steps}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              type="submit"
              disabled={!isValid}
              className={`inline-flex justify-center rounded-lg px-5 py-2.5 text-white transition
                ${isValid
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                  : 'bg-blue-300 cursor-not-allowed'}
              `}
            >
              Submit Recipe
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle('');
                setIngredientsText('');
                setStepsText('');
                setTouched({ title: false, ingredients: false, steps: false });
                setSubmitted(false);
              }}
              className="inline-flex justify-center rounded-lg px-5 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
            >
              Reset
            </button>

            <Link
              to="/"
              className="inline-flex justify-center rounded-lg px-5 py-2.5 border border-transparent text-blue-600 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
