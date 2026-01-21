import * as service from '../../modules/items/item.service';
import { db } from '../../config/db';

jest.mock('../../config/db', () => ({
  db: { query: jest.fn() },
}));

describe('Item Service', () => {
  afterEach(() => jest.clearAllMocks());

  it('should create item', async () => {
    (db.query as jest.Mock).mockResolvedValue([{}]);

    await service.create({ name: 'Burger' });

    expect(db.query).toHaveBeenCalled();
  });

  it('should update item', async () => {
    await service.update(1, { name: 'Pizza' });

    expect(db.query).toHaveBeenCalledWith(
      'UPDATE items SET ? WHERE id=?',
      [{ name: 'Pizza' }, 1]
    );
  });

  it('should update availability', async () => {
    await service.updateAvailability(1, true);

    expect(db.query).toHaveBeenCalledWith(
      'UPDATE items SET is_available=? WHERE id=?',
      [1, 1]
    );
  });

  it('should get active items', async () => {
    (db.query as jest.Mock).mockResolvedValue([[{ id: 1 }]]);

    const items = await service.getActiveItems();

    expect(items.length).toBe(1);
  });
});
