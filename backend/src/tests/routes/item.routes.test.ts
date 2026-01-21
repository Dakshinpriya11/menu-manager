import request from 'supertest';
import express from 'express';
import itemRoutes from '../../modules/items/item.routes';

jest.mock('../../middlewares/auth.middleware', () => ({
  authMiddleware: (_: any, __: any, next: any) => next(),
}));

jest.mock('../../middlewares/role.middleware', () => ({
  allowRoles: () => (_: any, __: any, next: any) => next(),
}));

jest.mock('../../middlewares/validation.middleware', () => ({
  validate: () => (_: any, __: any, next: any) => next(),
}));

jest.mock('../../modules/items/item.controller', () => ({
  addItem: (_: any, res: any) => res.status(201).json({ message: 'Item added' }),
  updateItem: (_: any, res: any) => res.json({ message: 'Item updated' }),
  updateAvailability: (_: any, res: any) =>
    res.json({ message: 'Availability updated' }),
  getActiveItems: (_: any, res: any) => res.json([{ id: 1 }]),
}));

const app = express();
app.use(express.json());
app.use('/items', itemRoutes);

describe('Item Routes', () => {
  it('POST /items', async () => {
    const res = await request(app).post('/items').send({
      name: 'Burger',
      base_price: 100,
      menu_id: 1,
    });

    expect(res.status).toBe(201);
  });

  it('PUT /items/:id', async () => {
    const res = await request(app).put('/items/1').send({ name: 'Pizza' });

    expect(res.status).toBe(200);
  });

  it('PATCH /items/:id/availability', async () => {
    const res = await request(app)
      .patch('/items/1/availability')
      .send({ is_available: true });

    expect(res.status).toBe(200);
  });

  it('GET /items/active', async () => {
    const res = await request(app).get('/items/active');

    expect(res.body.length).toBe(1);
  });
});
