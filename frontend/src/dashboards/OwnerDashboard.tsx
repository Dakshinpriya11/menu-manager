import React, { useState } from 'react';
import MenusTab from './tabs/MenusTab';
import ItemsTab from './tabs/ItemsTab';
import PricingTab from './tabs/PricingTab';
import StaffTab from './tabs/StaffTab';
import type { User } from '../types';

interface OwnerDashboardProps {
  user: User;
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
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-extrabold text-red-600">Restaurant Owner</h1>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-3">
          {[
            { key: 'menus', label: 'Menus', icon: '🗂' },
            { key: 'items', label: 'Items', icon: '🍽' },
            { key: 'pricing', label: 'Order Pricing', icon: '💰' },
            { key: 'staff', label: 'Staff', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`w-full flex items-center px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span
                className={`mr-2 text-lg ${
                  activeTab === tab.key ? 'text-white' : 'text-red-600'
                }`}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-6 border-t">
          <button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span className="text-red-200 text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">{renderTab()}</main>
    </div>
  );
};

export default OwnerDashboard;
