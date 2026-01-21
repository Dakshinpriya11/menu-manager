import { addStaff } from '../../modules/users/user.controller';
import * as service from '../../modules/users/user.service';
import { HTTP_STATUS } from '../../errors/httpStatus';

jest.mock('../../modules/users/user.service');

describe('User Controller - addStaff', () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('should throw error if required fields missing', async () => {
    const req: any = { body: { name: 'John' } };

    await expect(addStaff(req, res)).rejects.toBeDefined();
  });

  it('should create staff user successfully', async () => {
    const req: any = {
      body: {
        name: 'John',
        email: 'john@test.com',
        password: '123456',
      },
    };

    (service.createStaff as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'STAFF',
    });

    await addStaff(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'STAFF',
    });
  });
});
