import request from 'supertest';
import express from 'express';
import router from '../../modules/users/user.routes';

/**
 * Mock middlewares
 */
jest.mock('../../middlewares/auth.middleware', () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../middlewares/role.middleware', () => ({
  allowRoles: () => (_req: any, _res: any, next: any) => next(),
}));

jest.mock('../../middlewares/validation.middleware', () => ({
  validate: () => (_req: any, _res: any, next: any) => next(),
}));

/**
 * Mock controller
 */
jest.mock('../../modules/users/user.controller', () => ({
  addStaff: (_req: any, res: any) =>
    res.status(201).json({
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'STAFF',
    }),
}));

const app = express();
app.use(express.json());
app.use('/users', router);

describe('User Routes', () => {
  it('POST /users/staff should create staff', async () => {
    const res = await request(app)
      .post('/users/staff')
      .send({
        name: 'John',
        email: 'john@test.com',
        password: '123456',
      });

    expect(res.status).toBe(201);
    expect(res.body.role).toBe('STAFF');
  });
});
