import type { User, Menu, MenuItem, OrderType } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = {
  // AUTH
  async login(email: string, password: string): Promise<User> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  // CUSTOMER MENU
  async getCustomerMenu(orderType: string) {
  const apiOrderType =
    orderType === 'TAKEAWAY' ? 'DELIVERY' : orderType;

  console.log('Fetching customer menu for:', apiOrderType);

  const res = await fetch(
    `${API_URL}/menus/customer/menu?orderType=${apiOrderType}`
  );

  if (!res.ok) throw new Error('Failed to fetch customer menu');
  return res.json();
},

  // MENUS
  async getMenus(token: string): Promise<Menu[]> {
  const url = `${API_URL}/menus/active`;
  console.log('Fetching menus from:', url); // debug
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch menus');
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
},

  async createMenu(token: string, data: { name: string; start_time: string; end_time: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create menu');
    return res.json();
  },

  async updateMenu(token: string, id: number, data: { name: string; start_time: string; end_time: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/menus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update menu');
    return res.json();
  },

  async deleteMenu(token: string, id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/menus/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete menu');
    return res.json();
  },

  // ITEMS
  async getItems(token: string): Promise<MenuItem[]> {
    const res = await fetch(`${API_URL}/items/active`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async createItem(token: string, data: MenuItem): Promise<{ message: string; item: MenuItem }> {
    const res = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create item');
    return res.json();
  },

  async updateItem(token: string, id: number, data: MenuItem): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update item');
    return res.json();
  },

  async deleteItem(token: string, id: number): Promise<void> {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to delete item');
    return;
  },

  // ORDER TYPES
  async updateOrderTypes(token: string, data: OrderType[]): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/order-types`, {
      method: 'PATCH', // as per your documentation
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update order types');
    return res.json();
  },

  // ADD STAFF
  async addStaff(token: string, data: { name: string; email: string; password: string }): Promise<User> {
    const res = await fetch(`${API_URL}/users/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add staff');
    return res.json();
  },
  async getOrderTypes(token: string): Promise<OrderType[]> {
  const res = await fetch(`${API_URL}/order-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch order types');
  return res.json();
},
 // GET all menus
  async getAllMenus(token: string): Promise<Menu[]> {
    const res = await fetch(`${API_URL}/menus`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch menus');
    return res.json();
  },
  async updateItemAvailability(
  token: string,
  itemId: number,
  is_available: boolean
): Promise<void> {
  const res = await fetch(`${API_URL}/items/${itemId}/availability`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_available }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update item availability');
  }
},

};
