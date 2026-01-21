import * as service from '../../modules/auth/auth.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db';

jest.mock('../../config/db', () => ({
  db: { query: jest.fn() },
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when credentials are valid', async () => {
    (db.query as jest.Mock).mockResolvedValue([
      [{ id: 1, email: 'test@test.com', password: 'hashed', role: 'OWNER', name: 'Test' }],
    ]);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const user = await service.login('test@test.com', 'password');

    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@test.com');
  });

  it('should return null if user not found', async () => {
    (db.query as jest.Mock).mockResolvedValue([[]]);

    const user = await service.login('x@test.com', 'password');

    expect(user).toBeNull();
  });

  it('should return null if password mismatch', async () => {
    (db.query as jest.Mock).mockResolvedValue([
      [{ password: 'hashed' }],
    ]);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const user = await service.login('test@test.com', 'wrong');

    expect(user).toBeNull();
  });

  it('should generate JWT token', () => {
    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    const token = service.generateToken({
      id: 1,
      role: 'OWNER',
      name: 'Test',
    } as any);

    expect(token).toBe('mock-token');
  });
});
