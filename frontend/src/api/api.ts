import type { User, Menu, MenuItem, OrderType } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = {
  async login(email: string, password: string): Promise<User> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async getCustomerMenu(orderType: string): Promise<MenuItem[]> {
    const res = await fetch(`${API_URL}/menus/customer?orderType=${orderType}`);
    if (!res.ok) throw new Error('Failed to fetch menu');
    return res.json();
  },

  async getMenus(token: string): Promise<Menu[]> {
    const res = await fetch(`${API_URL}/menus`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch menus');
    return res.json();
  },

  async getItems(token: string): Promise<MenuItem[]> {
    const res = await fetch(`${API_URL}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async getOrderTypes(token: string): Promise<OrderType[]> {
    const res = await fetch(`${API_URL}/order-types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch order types');
    return res.json();
  },

  // For POST/PUT that returns created/updated object
  async createMenu(token: string, data: { name: string; is_active: boolean }): Promise<Menu> {
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

  async createItem(token: string, data: MenuItem): Promise<MenuItem> {
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
   async updateMenu(token: string, id: number, data: { name: string; is_active: boolean }): Promise<unknown> {
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

 async deleteMenu(token: string, id: number): Promise<unknown> {
    const res = await fetch(`${API_URL}/menus/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete menu');
    return res.json();
  },
    // UPDATE ITEM
  async updateItem(token: string, id: number, data: MenuItem): Promise<MenuItem> {
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

  // DELETE ITEM
  async deleteItem(token: string, id: number): Promise<void> {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete item');
    return;
  },

// UPDATE multiple order types
async updateOrderTypes(token: string, data: OrderType[]): Promise<void> {
  const res = await fetch(`${API_URL}/order-types`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update order types');
  return;
}
 
  
};
