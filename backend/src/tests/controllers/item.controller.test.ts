import * as controller from '../../modules/items/item.controller';
import * as service from '../../modules/items/item.service';

jest.mock('../../modules/items/item.service');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('Item Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw error if payload missing', async () => {
    const req: any = { body: {} };
    const res = mockRes();

    await expect(controller.addItem(req, res)).rejects.toThrow();
  });

  it('should add item successfully', async () => {
    const req: any = {
      body: { name: 'Burger', base_price: 100, menu_id: 1 },
    };
    const res = mockRes();

    await controller.addItem(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('should fail update with invalid id', async () => {
    const req: any = { params: { id: 'abc' }, body: {} };
    const res = mockRes();

    await expect(controller.updateItem(req, res)).rejects.toThrow();
  });

  it('should update item successfully', async () => {
    const req: any = { params: { id: '1' }, body: { name: 'Pizza' } };
    const res = mockRes();

    await controller.updateItem(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('should fail availability update if not boolean', async () => {
    const req: any = { params: { id: '1' }, body: { is_available: 'yes' } };
    const res = mockRes();

    await expect(controller.updateAvailability(req, res)).rejects.toThrow();
  });

  it('should update availability successfully', async () => {
    const req: any = { params: { id: '1' }, body: { is_available: true } };
    const res = mockRes();

    await controller.updateAvailability(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  it('should get active items', async () => {
    (service.getActiveItems as jest.Mock).mockResolvedValue([{ id: 1 }]);

    const req: any = {};
    const res = mockRes();

    await controller.getActiveItems(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });
});
