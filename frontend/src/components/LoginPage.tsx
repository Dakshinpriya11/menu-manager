// src/components/LoginPage.tsx
import React, { useState } from 'react';
import { api } from '../api/api';
import type{ User } from '../types';

interface LoginPageProps {
  onLogin: (user: User, token: string) => void; // token is optional
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const data = await api.login(email, password); // data includes { id, name, role, token }
    const { token, ...user } = data; // split token from user object
    onLogin(user as User, token);     // send both to App
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Login failed');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
          🔐 Restaurant Login
        </h1>
        <p className="text-center text-gray-600 mb-6">Authorized staff only</p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Logging in...' : '🟠 Login to Dashboard'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-red-600 text-sm underline"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};
