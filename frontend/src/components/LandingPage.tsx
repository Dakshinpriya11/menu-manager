import React from 'react';

type Page = 'landing' | 'order-type' | 'customer-menu' | 'login' | 'owner' | 'staff';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    {/* Hero Section */}
    <div className="relative flex-1 flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
        alt="Delicious food background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-700/85 to-red-600/70" />

      {/* Center Card */}
      <div className="relative z-10 max-w-2xl w-full mx-6 backdrop-blur-md bg-white/20 border border-white/25 rounded-3xl p-10 text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Delicious Food, Delivered Fresh 🍽️
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8">
          Savor quality meals crafted with the finest ingredients, right at your fingertips.
        </p>

        <button
          onClick={() => onNavigate('order-type')}
          className="bg-red-600 text-white font-semibold px-10 py-4 rounded-xl text-lg shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-400/40"
        >
          Explore Menu
        </button>
      </div>
    </div>

    {/* Footer Login */}
    <div className="p-6 text-center">
      <button
        onClick={() => onNavigate('login')}
        className="text-black hover:text-red-600 underline text-sm transition-colors font-medium"
      >
        🔐 Restaurant Login
      </button>
    </div>
  </div>
);

export default LandingPage;
