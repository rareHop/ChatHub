import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid password. Hint: chatpass123');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Choose your username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter any username (min 3 chars)"
          className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 transition-colors"
          required
          minLength={3}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the shared password"
          className="mt-1 block w-full rounded-xl border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 transition-colors"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Shared password: chatpass123
        </p>
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>
      )}
      <button
        type="submit"
        className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Sign In
      </button>
    </form>
  );
};