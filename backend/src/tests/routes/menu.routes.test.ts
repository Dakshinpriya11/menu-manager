import request from 'supertest';
import express from 'express';
import menuRouter from '../../modules/menus/menu.routes';
import * as controller from '../../modules/menus/menu.controller';

const app = express();
app.use(express.json());
app.use('/api/menus', menuRouter);

jest.mock('../../middlewares/auth.middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => next(),
}));

jest.mock('../../middlewares/role.middleware', () => ({
  allowRoles: () => (req: any, res: any, next: any) => next(),
}));

jest.mock('../../modules/menus/menu.controller', () => ({
  createMenu: jest.fn((req, res) =>
    res.status(201).json({ message: 'Menu created successfully' })
  ),
  updateMenu: jest.fn((req, res) =>
    res.json({ message: 'Menu updated successfully' })
  ),
  deleteMenu: jest.fn((req, res) =>
    res.json({ message: 'Menu deleted successfully' })
  ),
  getAllMenus: jest.fn((req, res) =>
    res.json([{ id: 1, name: 'Lunch' }])
  ),
}));



jest.mock('../../modules/menus/menu.controller', () => ({
  createMenu: jest.fn((req, res) => res.status(201).json({ message: 'Menu created successfully' })),
  updateMenu: jest.fn((req, res) => res.json({ message: 'Menu updated successfully' })),
  deleteMenu: jest.fn((req, res) => res.json({ message: 'Menu deleted successfully' })),
  getActiveMenu: jest.fn((req, res) => res.json({ id: 1, name: 'Lunch' })),
  getAllMenus: jest.fn((req, res) => res.json([{ id: 1, name: 'Lunch' }])),
  getCustomerMenu: jest.fn((req, res) => res.json([{ id: 1, name: 'Pizza', price: 120 }])),
}));

describe('Menu Routes', () => {
  it('POST /api/menus should create menu', async () => {
    const res = await request(app).post('/api/menus').send({ "name": "Lunch",
"start_time": "11:00",
"end_time": "15:00"});
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Menu created successfully');
  });


  it('GET /api/menus should return all menus', async () => {
    const res = await request(app).get('/api/menus');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
