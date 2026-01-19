// src/dashboards/tabs/ItemsTab.tsx
import React, { useState, useEffect } from 'react';
import type { Menu, MenuItem } from '../../types';
import { api } from '../../api/api';

interface ItemsTabProps {
  token: string;
}

const ItemsTab: React.FC<ItemsTabProps> = ({ token }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<MenuItem>({
    id: 0,
    name: '',
    base_price: 0,
    price: 0,
    menu_id: 0,
    menu_name: '',
    is_available: true,
  });

  // Fetch items and menus together safely
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, menusData] = await Promise.all([
          api.getItems(token),
          api.getMenus(token),
        ]);
        setItems(itemsData);
        setMenus(menusData);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to load data');
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.updateItem(token, formData.id, formData);
      } else {
        await api.createItem(token, formData);
      }
      setShowForm(false);
      setFormData({
        id: 0,
        name: '',
        base_price: 0,
        price: 0,
        menu_id: 0,
        menu_name: '',
        is_available: true,
      });
      // Refresh items after add/update
      const updatedItems = await api.getItems(token);
      setItems(updatedItems);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.deleteItem(token, id);
      const updatedItems = await api.getItems(token);
      setItems(updatedItems);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Manage Items</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          ➕ Add Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit Item' : 'Add Item'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
              <input
                type="number"
                value={formData.base_price}
                onChange={(e) =>
                  setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Menu Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menu</label>
              <select
                value={formData.menu_id}
                onChange={(e) => setFormData({ ...formData, menu_id: parseInt(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Menu</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Available</label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    id: 0,
                    name: '',
                    base_price: 0,
                    price: 0,
                    menu_id: 0,
                    menu_name: '',
                    is_available: true,
                  });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Menu</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
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
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setFormData(item);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️
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

export default ItemsTab;
