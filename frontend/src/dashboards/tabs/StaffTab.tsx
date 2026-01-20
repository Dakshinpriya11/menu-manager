import React, { useState } from 'react';
import { api } from '../../api/api';

interface OwnerStaffTabProps {
  token: string;
}

const OwnerStaffTab: React.FC<OwnerStaffTabProps> = ({ token }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);

    try {
      await api.addStaff(token, { name, email, password });
      setMessage('Staff created successfully');
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Failed to add staff');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-red-600">Add Staff Member</h2>
        <p className="text-gray-600 mt-1">
          Create a new staff account to manage item availability
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full border border-gray-100">
        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium border ${
              isSuccess
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleAddStaff} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@example.com"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
            }`}
          >
            {loading ? 'Creating Staff...' : 'Add Staff'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerStaffTab;
