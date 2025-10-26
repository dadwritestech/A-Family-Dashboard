import React from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">A Family Dashboard</h1>
        <p className="mb-4">Please sign in to continue</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
