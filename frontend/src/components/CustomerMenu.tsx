// src/components/CustomerMenu.tsx
import React, { useEffect, useState } from 'react';
import type { MenuItem } from '../types';
import { api } from '../api/api';

interface CustomerMenuProps {
  orderType: string;
  token: string;
  onBack: () => void;
}

const CustomerMenu: React.FC<CustomerMenuProps> = ({
  orderType,
  token,
  onBack,
}) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const apiOrderType =
          orderType === 'TAKE_AWAY' ? 'DELIVERY' : orderType;

        const data: MenuItem[] = await api.getCustomerMenu(apiOrderType);
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [orderType, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-lg">Preparing today’s menu…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-[360px] md:h-[420px] lg:h-[480px]">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="Restaurant background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Red Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/90 to-red-600/80" />

        {/* Glass Overlay */}
        <div className="relative z-10 h-full flex justify-center items-center px-6">
          <div className="w-full md:w-4/5 lg:w-3/5 backdrop-blur-md bg-white/15 border border-white/25 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="absolute top-6 left-6 md:top-8 md:left-8 text-white/90 hover:text-white font-medium text-sm md:text-base"
            >
              ← Back
            </button>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {orderType === 'DINE_IN' ? 'Dine-In Menu' : 'Take-Away Menu'}
            </h1>

            {/* Tagline */}
            <p className="mt-4 text-white/90 text-base md:text-lg max-w-2xl">
              Experience freshly crafted meals with love and the finest ingredients.
            </p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
                🍽️ Premium Quality
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
                ⏱️ Quick Service
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
                😋 Delicious & Fresh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No items available at the moment.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300
                  ${
                    item.is_available
                      ? 'hover:-translate-y-1 hover:shadow-xl'
                      : 'opacity-50 grayscale'
                  }`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!item.is_available && (
                    <span className="absolute inset-0 bg-white/70 flex items-center justify-center font-bold text-gray-700">
                      SOLD OUT
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.name}
                  </h3>

                  <p className="text-red-600 text-2xl font-extrabold mb-3">
                    ₹{item.price}
                  </p>

                  {item.is_available ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      ● Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                      ● Unavailable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerMenu;
