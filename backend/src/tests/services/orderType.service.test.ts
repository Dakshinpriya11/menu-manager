import * as service from '../../modules/order-types/orderType.service';
import { db } from '../../config/db';

jest.mock('../../config/db', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('OrderType Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update price modifier', async () => {
    (db.query as jest.Mock).mockResolvedValueOnce([]);

    await service.updateModifier(1, 1.2);

    expect(db.query).toHaveBeenCalledWith(
      'UPDATE order_types SET price_modifier=? WHERE id=?',
      [1.2, 1]
    );
  });

  it('should get all order types', async () => {
    const mockRows = [{ id: 1, price_modifier: 1 }];
    (db.query as jest.Mock).mockResolvedValueOnce([mockRows]);

    const result = await service.getAll();

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM order_types');
    expect(result).toEqual(mockRows);
  });
});
