
import * as controller from '../../modules/menus/menu.controller';
import * as service from '../../modules/menus/menu.service';
import { AppError } from '../../errors/appError';
import { HTTP_STATUS } from '../../errors/httpStatus';

jest.mock('../../modules/menus/menu.service');
describe('Menu Controller', () => {
  const mockRes: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mockReq: any = { body: {}, params: {}, query: {} };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createMenu should call service.create and return 201', async () => {
    mockReq.body = { "name": "Lunch",
"start_time": "11:00",
"end_time": "15:00"};
    (service.create as jest.Mock).mockResolvedValue({});

    await controller.createMenu(mockReq, mockRes);

    expect(service.create).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Menu created successfully' });
  });

  it('updateMenu should throw AppError for invalid id', async () => {
    mockReq.params.id = 'abc';
    await expect(controller.updateMenu(mockReq, mockRes)).rejects.toBeInstanceOf(AppError);
  });

});
