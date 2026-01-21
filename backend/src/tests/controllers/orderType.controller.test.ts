import { update, getAll } from '../../modules/order-types/orderType.controller';
import * as service from '../../modules/order-types/orderType.service';
import { Request, Response } from 'express';

jest.mock('../../modules/order-types/orderType.service');

describe('OrderType Controller', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      json: jest.fn(),
    };
  });

  it('should update multiple order types', async () => {
    const req = {
      body: [
        { id: 1, price_modifier: 1.2 },
        { id: 2, price_modifier: 0.8 },
      ],
    } as Request;

    (service.updateModifier as jest.Mock).mockResolvedValue(undefined);

    await update(req, res as Response);

    expect(service.updateModifier).toHaveBeenCalledTimes(2);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Order types updated successfully',
    });
  });

  it('should throw error if body is not array', async () => {
    const req = { body: {} } as Request;

    await expect(update(req, res as Response)).rejects.toThrow();
  });

  it('should return all order types', async () => {
    const mockTypes = [{ id: 1, price_modifier: 1 }];
    (service.getAll as jest.Mock).mockResolvedValue(mockTypes);

    await getAll({} as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(mockTypes);
  });
});
