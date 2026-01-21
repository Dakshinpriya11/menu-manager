import request from 'supertest';
import express from 'express';
import authRoutes from '../../modules/auth/auth.routes';

jest.mock('../../modules/auth/auth.controller', () => ({
  login: (req: any, res: any) =>
    res.json({ token: 'test-token' }),
}));

jest.mock('../../middlewares/validation.middleware', () => ({
  validate: () => (req: any, res: any, next: any) => next(),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  it('POST /auth/login should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe('test-token');
  });
});
