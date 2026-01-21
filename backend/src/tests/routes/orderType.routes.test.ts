import request from 'supertest';
import express from 'express';
import router from '../../modules/order-types/orderType.routes';

jest.mock('../../middlewares/auth.middleware', () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../middlewares/role.middleware', () => ({
  allowRoles: () => (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../middlewares/validation.middleware', () => ({
  validate: () => (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../modules/order-types/orderType.controller', () => ({
  update: (_req: any, res: any) =>
    res.json({ message: 'Order types updated successfully' }),
  getAll: (_req: any, res: any) => res.json([]),
}));

const app = express();
app.use(express.json());
app.use('/order-types', router);

describe('OrderType Routes', () => {
  it('PATCH /order-types should update order types', async () => {
    const res = await request(app)
      .patch('/order-types')
      .send([{ id: 1, price_modifier: 1.1 }]);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Order types updated successfully');
  });

  it('GET /order-types should return all order types', async () => {
    const res = await request(app).get('/order-types');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
