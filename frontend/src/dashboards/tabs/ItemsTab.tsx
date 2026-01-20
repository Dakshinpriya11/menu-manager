import React, { useState, useEffect } from 'react';
import type { Menu, MenuItem } from '../../types';
import { api } from '../../api/api';

interface ItemsTabProps {
  token: string;
}

// Payload type for backend API
interface MenuItemPayload {
  name: string;
  base_price: number;
  menu_id: number;
  is_available: boolean;
}

const ItemsTab: React.FC<ItemsTabProps> = ({ token }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<MenuItem & { base_price_str?: string }>({
    id: 0,
    name: '',
    base_price: 0,
    base_price_str: '0',
    price: 0,
    menu_id: 0,
    menu_name: '',
    is_available: true,
  });

  // Fetch items and menus
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, menusData] = await Promise.all([
          api.getItems(token),
          api.getAllMenus(token),
        ]);
        setItems(itemsData);
        setMenus(menusData);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to load data');
      }
    };
    fetchData();
  }, [token]);

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.menu_id) {
        alert('Please select a menu');
        return;
      }

      const payload: MenuItemPayload = {
        name: formData.name,
        base_price: Number(formData.base_price),
        menu_id: Number(formData.menu_id),
        is_available: Boolean(formData.is_available),
      };

      if (formData.id) {
        await api.updateItem(token, formData.id, payload as never);
      } else {
        await api.createItem(token, payload as never);
      }

      setShowForm(false);
      setFormData({
        id: 0,
        name: '',
        base_price: 0,
        base_price_str: '0',
        price: 0,
        menu_id: 0,
        menu_name: '',
        is_available: true,
      });

      const updatedItems = await api.getItems(token);
      setItems(updatedItems);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  // Delete item
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

  const itemsWithMenuName = items.map((item) => {
    const menu = menus.find((m) => m.id === item.menu_id);
    return { ...item, menu_name: menu?.name || 'N/A' };
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-red-600">Manage Items</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 max-w-xl">
          <h3 className="text-xl font-semibold mb-4 text-red-600">
            {formData.id ? 'Edit Item' : 'Add Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
              />
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Price</label>
              <input
                type="number"
                value={formData.base_price_str}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    base_price_str: e.target.value,
                    base_price: parseFloat(e.target.value) || 0,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
              />
            </div>

            {/* Menu Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menu</label>
              <select
                value={formData.menu_id || ''}
                onChange={(e) => setFormData({ ...formData, menu_id: parseInt(e.target.value) })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:outline-none"
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
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
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
                    base_price_str: '0',
                    price: 0,
                    menu_id: 0,
                    menu_name: '',
                    is_available: true,
                  });
                }}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-red-50">
            <tr>
              {['Item', 'Menu', 'Price', 'Status', 'Actions'].map((title) => (
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
            {itemsWithMenuName.length ? (
              itemsWithMenuName.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">{item.menu_name}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">₹{item.base_price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.is_available ? 'ON' : 'OFF'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => {
                        setFormData({
                          ...item,
                          base_price_str: String(item.base_price),
                        });
                        setShowForm(true);
                      }}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
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

export default ItemsTab;
