import React from 'react';
import TodoList from './components/TodoList';
import Weather from './components/Weather';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-600">Stay organized and check the weather at a glance.</p>
      </header>
      <main className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h2>
          <TodoList />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Weather</h2>
          <Weather />
        </div>
      </main>
    </div>
  );
}

export default App;
