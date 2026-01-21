import * as service from '../../modules/menus/menu.service';
import { db } from '../../config/db';

jest.mock('../../config/db', () => ({
  db: { query: jest.fn() },
}));

describe('Menu Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create should call db.query with correct data', async () => {
    const menuData = { name: 'Lunch', start_time: '12:00:00', end_time: '14:00:00' };
    (db.query as jest.Mock).mockResolvedValue([{}]);

    await service.create(menuData);

    expect(db.query).toHaveBeenCalledWith('INSERT INTO menus SET ?', menuData);
  });

  it('getActive should return first menu or null', async () => {
    const mockRows = [{ id: 1, name: 'Lunch' }];
    (db.query as jest.Mock).mockResolvedValue([mockRows]);

    const result = await service.getActive();

    expect(result).toEqual(mockRows[0]);
  });

  it('getAll should return rows with is_active', async () => {
    const mockRows = [
      { id: 1, name: 'Lunch', start_time: '12:00', end_time: '14:00', is_active: 1 },
    ];
    (db.query as jest.Mock).mockResolvedValue([mockRows]);

    const result = await service.getAll();

    expect(result).toEqual(mockRows);
  });

  it('getPriceModifier returns correct modifier', async () => {
    const mockRows = [{ price_modifier: 1.2 }];
    (db.query as jest.Mock).mockResolvedValue([mockRows]);

    const result = await service.getPriceModifier('DELIVERY');

    expect(result).toBe(1.2);
  });

  it('getPriceModifier returns null for invalid type', async () => {
    (db.query as jest.Mock).mockResolvedValue([[]]);

    const result = await service.getPriceModifier('INVALID');

    expect(result).toBeNull();
  });
});
