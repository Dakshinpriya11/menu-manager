import * as service from '../../modules/users/user.service';
import bcrypt from 'bcrypt';
import { db } from '../../config/db';

jest.mock('bcrypt');
jest.mock('../../config/db', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('User Service - createStaff', () => {
  it('should hash password and insert staff user', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

    (db.query as jest.Mock).mockResolvedValue([
      { insertId: 10 },
    ]);

    const result = await service.createStaff({
      name: 'John',
      email: 'john@test.com',
      password: '123456',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(db.query).toHaveBeenCalled();
    expect(result).toEqual({
      id: 10,
      name: 'John',
      email: 'john@test.com',
      role: 'STAFF',
    });
  });
});
