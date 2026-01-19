// src/components/CustomerMenu.tsx
import React, { useEffect, useState } from 'react';
import type { MenuItem } from '../types';
import { api } from '../api/api'; // import your api helper

interface CustomerMenuProps {
  orderType: string;
  onBack: () => void;
}

const CustomerMenu: React.FC<CustomerMenuProps> = ({ orderType, onBack }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data: MenuItem[] = await api.getCustomerMenu(orderType);
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [orderType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="text-white hover:underline">
            ← Back
          </button>
          <h1 className="text-3xl font-bold">
            {orderType === 'DINEIN' ? 'Dine In' : 'Take Away'} Menu
          </h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !item.is_available ? 'opacity-50 grayscale' : ''
              }`}
            >
              <div className="text-4xl mb-3">🍔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-2xl font-semibold text-red-600 mb-4">₹{item.price}</p>
              {item.is_available ? (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Available
                </span>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                  SOLD OUT
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerMenu;
