import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind + React is working ✅
      </h1>
      <p className="mt-2 text-gray-700">
        Edit <code>src/App.jsx</code> and save to test HMR.
      </p>
      <button className="mt-6 rounded-xl border px-4 py-2 hover:bg-blue-600 hover:text-white transition">
        Test Button
      </button>
    </div>
  )
}

export default App

