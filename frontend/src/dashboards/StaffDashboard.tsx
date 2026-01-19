// src/dashboards/StaffDashboard.tsx
import React from 'react';
import StaffTab from './tabs/StaffTab';

interface StaffDashboardProps {
  token: string;
  onLogout: () => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ token, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-red-600">Staff Dashboard</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <button
            className="w-full text-left px-4 py-2 rounded-lg font-semibold bg-red-600 text-white cursor-default"
          >
            🧑‍🍳 Manage Items
          </button>
        </nav>
        <div className="px-6 py-4 border-t">
          <button
            onClick={onLogout}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <StaffTab token={token} />
      </main>
    </div>
  );
};

export default StaffDashboard;
