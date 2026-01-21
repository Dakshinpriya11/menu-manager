import { login } from '../../modules/auth/auth.controller';
import * as service from '../../modules/auth/auth.service';

jest.mock('../../modules/auth/auth.service');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when email or password missing', async () => {
    const req: any = { body: {} };
    const res = mockRes();

    await expect(login(req, res)).rejects.toThrow();
  });

  it('should throw error for invalid credentials', async () => {
    (service.login as jest.Mock).mockResolvedValue(null);

    const req: any = {
      body: { email: 'test@test.com', password: 'wrong' },
    };
    const res = mockRes();

    await expect(login(req, res)).rejects.toThrow();
  });

  it('should return token on successful login', async () => {
    (service.login as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Test',
      role: 'OWNER',
    });

    (service.generateToken as jest.Mock).mockReturnValue('jwt-token');

    const req: any = {
      body: { email: 'test@test.com', password: 'password' },
    };
    const res = mockRes();

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'Test',
      role: 'OWNER',
      token: 'jwt-token',
    });
  });
});
