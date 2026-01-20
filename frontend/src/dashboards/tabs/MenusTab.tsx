import React, { useEffect, useState } from 'react';
import type { Menu } from '../../types';
import { api } from '../../api/api';

interface MenusTabProps {
  token: string;
}

const MenusTab: React.FC<MenusTabProps> = ({ token }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Menu>>({
    id: undefined,
    name: '',
    start_time: '',
    end_time: '',
  });

  /* ---------------- FETCH MENUS ---------------- */
  useEffect(() => {
    let cancelled = false;

    const loadMenus = async () => {
      try {
        const allMenus = await api.getAllMenus(token);
        const activeMenus = await api.getMenus(token);
        if (!cancelled) {
          setMenus(allMenus);
          setActiveMenuId(activeMenus[0]?.id ?? null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          alert(err instanceof Error ? err.message : 'Failed to load menus');
        }
      }
    };

    loadMenus();

    return () => {
      cancelled = true;
    };
  }, [token]);

  /* ---------------- CREATE / UPDATE ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.id) {
        const original = menus.find((m) => m.id === formData.id);
        if (!original) return;

        const payload = {
          name: formData.name?.trim() || original.name,
          start_time: formData.start_time || original.start_time,
          end_time: formData.end_time || original.end_time,
        };

        await api.updateMenu(token, formData.id, payload);
      } else {
        const payload = {
          name: formData.name!.trim(),
          start_time: formData.start_time!,
          end_time: formData.end_time!,
        };

        await api.createMenu(token, payload);
      }

      setShowForm(false);
      setFormData({ id: undefined, name: '', start_time: '', end_time: '' });

      const allMenus = await api.getAllMenus(token);
      const activeMenus = await api.getMenus(token);
      setMenus(allMenus);
      setActiveMenuId(activeMenus[0]?.id ?? null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: number) => {
    if (!confirm('Deleting this menu will remove all its items. Proceed?')) return;
    try {
      await api.deleteMenu(token, id);
      const allMenus = await api.getAllMenus(token);
      const activeMenus = await api.getMenus(token);
      setMenus(allMenus);
      setActiveMenuId(activeMenus[0]?.id ?? null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-red-600">Menus</h2>
        <button
          onClick={() => {
            setFormData({ id: undefined, name: '', start_time: '', end_time: '' });
            setShowForm(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Add Menu
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-red-100 rounded-xl shadow-md p-6 mb-6 max-w-xl">
          <h3 className="text-xl font-semibold mb-4 text-red-600">
            {formData.id ? 'Edit Menu' : 'Create Menu'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Menu Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
            />

            <div className="flex gap-4">
              <input
                type="time"
                value={formData.start_time || ''}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <input
                type="time"
                value={formData.end_time || ''}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div className="flex gap-3">
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
                  setFormData({ id: undefined, name: '', start_time: '', end_time: '' });
                }}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-red-50">
            <tr>
              {['Name', 'Time', 'Status', 'Actions'].map((title) => (
                <th key={title} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {menus.length ? (
              menus.map((menu) => (
                <tr
                  key={menu.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{menu.name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {menu.start_time} – {menu.end_time}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        menu.id === activeMenuId
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {menu.id === activeMenuId ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => {
                        const original = menus.find((m) => m.id === menu.id);
                        if (!original) return;
                        setFormData({
                          id: original.id,
                          name: original.name || '',
                          start_time: original.start_time || '',
                          end_time: original.end_time || '',
                        });
                        setShowForm(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="text-gray-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  No menus found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenusTab;
