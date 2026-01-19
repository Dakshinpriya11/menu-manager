// src/dashboards/tabs/PricingTab.tsx
import React, { useEffect, useState } from 'react';
import type { OrderType } from '../../types';
import { api } from '../../api/api';

interface PricingTabProps {
  token: string;
}

const PricingTab: React.FC<PricingTabProps> = ({ token }) => {
  const [orderTypes, setOrderTypes] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all order types on mount
  useEffect(() => {
    const fetchOrderTypes = async () => {
      try {
        const data = await api.getOrderTypes(token);
        setOrderTypes(data);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to load pricing rules');
      }
    };
    fetchOrderTypes();
  }, [token]);

  // Handle modifier change in input
  const handleChange = (id: number, value: number) => {
    setOrderTypes((prev) =>
      prev.map((ot) => (ot.id === id ? { ...ot, price_modifier: value } : ot))
    );
  };

  // Save all updated modifiers
  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateOrderTypes(token, orderTypes);
      alert('Pricing updated successfully!');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Pricing Rules</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderTypes.map((ot) => (
          <div
            key={ot.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {ot.type === 'DINE_IN' ? '🍽️ Dine In' : '🥡 Take Away'}
              </h3>
              <p className="text-gray-600 mb-4">
                Adjust the price modifier for this order type
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Modifier (%):</span>
              <input
                type="number"
                value={ot.price_modifier}
                onChange={(e) => handleChange(ot.id, parseFloat(e.target.value) || 0)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          {loading ? 'Saving...' : '🟠 Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default PricingTab;
