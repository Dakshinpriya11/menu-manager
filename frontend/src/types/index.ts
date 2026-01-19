// src/types/index.ts

export interface User {
  id: number;
  name: string;
  role: 'OWNER' | 'STAFF';
  token: string;
}

export interface Menu {
  id: number;
  name: string;
  is_active: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  menu_name: string;
  is_available: boolean;
  base_price?: number;
  menu_id?: number;
}

export interface OrderType {
  id: number;
  type: string;
  price_modifier: number;
}
