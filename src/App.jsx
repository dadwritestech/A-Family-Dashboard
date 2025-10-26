import React, { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import TodoList from './components/TodoList';
import Weather from './components/Weather';
import Calendar from './components/Calendar';
import Notes from './components/Notes';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="h-screen bg-gray-100 p-8 font-sans">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">

        {/* Left Column: Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Calendar</h2>
          <div className="flex-grow">
            <Calendar />
          </div>
        </div>

        {/* Right Column: Stacked widgets */}
        <div className="flex flex-col gap-8">

          {/* Weather Widget */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Weather />
          </div>

          {/* TodoList Widget */}
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
            <TodoList />
          </div>

          {/* Notes Widget */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shared Notes</h2>
            <Notes />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
