// src/dashboards/OwnerDashboard.tsx
import React, { useState } from 'react';
import MenusTab from './tabs/MenusTab';
import ItemsTab from './tabs/ItemsTab';
import PricingTab from './tabs/PricingTab';
import StaffTab from './tabs/StaffTab';

interface OwnerDashboardProps {
  token: string;
  onLogout: () => void;
}

type Tab = 'menus' | 'items' | 'pricing' | 'staff';

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('menus');

  const renderTab = () => {
    switch (activeTab) {
      case 'menus':
        return <MenusTab token={token} />;
      case 'items':
        return <ItemsTab token={token} />;
      case 'pricing':
        return <PricingTab token={token} />;
      case 'staff':
        return <StaffTab token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-red-600">Restaurant Owner</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <button
            onClick={() => setActiveTab('menus')}
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'menus' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            🗂 Menus
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'items' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            🍽 Items
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'pricing' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            💰 Order Pricing
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'staff' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            👥 Staff
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
      <main className="flex-1 overflow-auto p-6">{renderTab()}</main>
    </div>
  );
};

export default OwnerDashboard;
