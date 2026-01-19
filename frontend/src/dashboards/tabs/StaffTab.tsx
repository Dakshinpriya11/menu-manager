// src/dashboards/tabs/StaffTab.tsx
import React, { useEffect, useState } from 'react';
import type { MenuItem } from '../../types';
import { api } from '../../api/api';

interface StaffTabProps {
  token: string;
}

const StaffTab: React.FC<StaffTabProps> = ({ token }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.getItems(token);
        setItems(data);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to load items');
      }
    };
    fetchItems();
  }, [token]);

  // Toggle availability
  const toggleAvailability = async (item: MenuItem) => {
    setLoading(true);
    try {
      const updatedItem = { ...item, is_available: !item.is_available };
      await api.updateItem(token, item.id, updatedItem);
      // Update local state
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? updatedItem : it))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Manage Availability</h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Menu</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Availability</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.menu_name || 'N/A'}</td>
                <td className="px-6 py-4">₹{item.base_price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.is_available ? 'ON' : 'OFF'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={loading}
                    onClick={() => toggleAvailability(item)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      item.is_available
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {item.is_available ? 'Turn OFF' : 'Turn ON'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTab;
