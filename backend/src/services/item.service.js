const db = require("../config/db");

exports.createItem = async ({ categoryId, name }) => {
  await db.query(
    "INSERT INTO items (category_id, name) VALUES (?, ?)",
    [categoryId, name]
  );
};

exports.getItems = async (categoryId) => {
  const [rows] = await db.query(
    "SELECT * FROM items WHERE category_id=?",
    [categoryId]
  );
  return rows;
};

exports.updateItem = async (id, data) => {
  await db.query("UPDATE items SET name=? WHERE id=?", [data.name, id]);
};

exports.deleteItem = async (id) => {
  await db.query("DELETE FROM items WHERE id=?", [id]);
};

exports.setItemPricing = async (itemId, prices) => {
  await db.query(
    "REPLACE INTO item_prices VALUES (?, ?, ?)",
    [itemId, prices.dineinPrice, prices.takeawayPrice]
  );
};

exports.updateAvailability = async (itemId, available) => {
  await db.query(
    "UPDATE items SET available=? WHERE id=?",
    [available, itemId]
  );
};
