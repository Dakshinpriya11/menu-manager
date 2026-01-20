import React, { useEffect, useState } from 'react';
import type { User, MenuItem } from '../types';
import { api } from '../api/api';

interface StaffTabProps {
  token: string;
  user: User;
  onLogout: () => void;
}

const StaffTab: React.FC<StaffTabProps> = ({ token, onLogout }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.getItems(token);
        setItems(data);
      } catch (err: unknown) {
        console.error('Failed to load items:', err);
        alert(err instanceof Error ? err.message : 'Failed to load items');
      }
    };

    fetchItems();
  }, [token]);

  // Toggle availability
  const toggleAvailability = async (item: MenuItem) => {
    setLoading(true);
    try {
      await api.updateItemAvailability(token, item.id, !item.is_available);
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, is_available: !it.is_available } : it
        )
      );
    } catch (err: unknown) {
      console.error('Availability toggle failed:', err);
      alert(err instanceof Error ? err.message : 'Failed to update availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4 md:mb-0">
          Manage Menu Availability
        </h2>

        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          Logout
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              {['Item', 'Menu', 'Price', 'Availability', 'Actions'].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-700">{item.menu_name || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">₹{item.base_price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.is_available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.is_available ? 'ON' : 'OFF'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={loading}
                    onClick={() => toggleAvailability(item)}
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
                      item.is_available
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {item.is_available ? 'Turn OFF' : 'Turn ON'}
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTab;
