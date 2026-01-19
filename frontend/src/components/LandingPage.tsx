import React from 'react';

type Page = 'landing' | 'order-type' | 'customer-menu' | 'login' | 'owner' | 'staff';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-white flex flex-col">
    {/* Hero Section */}
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Delicious food, served fresh 🍽️
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose your order type and explore today's menu
        </p>
        <button
          onClick={() => onNavigate('order-type')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          🟠 Explore Menu
        </button>
      </div>
    </div>

    {/* Footer Login */}
    <div className="p-4 text-center">
      <button
        onClick={() => onNavigate('login')}
        className="text-gray-500 hover:text-red-600 text-sm underline"
      >
        🔐 Restaurant Login
      </button>
    </div>
  </div>
);

export default LandingPage;
