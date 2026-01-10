export type UserRole = 'OWNER' | 'STAFF';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: string;
}

export interface Menu {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  created_at?: string;
}

export interface Item {
  id: number;
  name: string;
  base_price: number;
  menu_id: number;
  is_available: boolean;
  created_at?: string;
}

export interface OrderType {
  id: number;
  name: string;
  price_modifier: number;
}
