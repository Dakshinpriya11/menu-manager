import React, { useState, useEffect } from 'react';
import type { Menu } from '../../types';
import { api } from '../../api/api';

interface MenusTabProps {
  token: string;
}

const MenusTab: React.FC<MenusTabProps> = ({ token }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', is_active: false });


    async function fetchMenus() {
    try {
        const data = await api.getMenus(token);
        setMenus(data);
    } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to load menus');
    }
    }

   useEffect(() => {
  // define an async function inside the effect
  const fetchData = async () => {
    try {
      const data = await api.getMenus(token);
      setMenus(data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to load menus');
    }
  };

  // immediately call it
  fetchData();
}, [token]); // include token in dependency array
;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.updateMenu(token, formData.id, {
          name: formData.name,
          is_active: formData.is_active,
        });
      } else {
        await api.createMenu(token, { name: formData.name, is_active: formData.is_active });
      }
      setShowForm(false);
      setFormData({ id: 0, name: '', is_active: false });
      fetchMenus();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this menu?')) return;
    try {
      await api.deleteMenu(token, id);
      fetchMenus();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Manage Menus</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          ➕ Add Menu
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">{formData.id ? 'Edit Menu' : 'Create Menu'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Active Menu</label>
            </div>
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
                  setFormData({ id: 0, name: '', is_active: false });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-t">
                <td className="px-6 py-4">{menu.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      menu.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {menu.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setFormData(menu);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(menu.id)} className="text-red-600 hover:underline">
                    🗑️ Delete
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

export default MenusTab;
