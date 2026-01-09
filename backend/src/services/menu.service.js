const db = require("../config/db");

exports.createMenu = async ({ name, outletId }) => {
  const [res] = await db.query(
    "INSERT INTO menus (name, outlet_id) VALUES (?, ?)",
    [name, outletId]
  );
  return { menuId: res.insertId };
};

exports.getMenus = async (outletId) => {
  const [rows] = await db.query(
    "SELECT * FROM menus WHERE outlet_id = ?",
    [outletId]
  );
  return rows;
};

exports.updateMenuStatus = async (menuId, active) => {
  await db.query("UPDATE menus SET active=? WHERE id=?", [active, menuId]);
};

exports.deleteMenu = async (menuId) => {
  await db.query("DELETE FROM menus WHERE id=?", [menuId]);
};

exports.setMenuTiming = async (menuId, { startTime, endTime }) => {
  await db.query(
    "UPDATE menus SET start_time=?, end_time=? WHERE id=?",
    [startTime, endTime, menuId]
  );
};

exports.getActiveMenu = async ({ outletId, time }) => {
  const [rows] = await db.query(
    `SELECT * FROM menus 
     WHERE outlet_id=? AND active=1 
     AND ? BETWEEN start_time AND end_time`,
    [outletId, time]
  );
  return rows[0];
};

exports.getMenuByOrderType = async (menuId, orderType) => {
  const priceCol =
    orderType === "takeaway" ? "takeaway_price" : "dinein_price";

  const [rows] = await db.query(
    `SELECT i.name, p.${priceCol} AS price
     FROM items i
     JOIN categories c ON i.category_id=c.id
     JOIN item_prices p ON p.item_id=i.id
     WHERE c.menu_id=? AND i.available=1`,
    [menuId]
  );

  return rows;
};

exports.getMenuAvailability = async (menuId) => {
  const [rows] = await db.query(
    `SELECT i.name, i.available
     FROM items i
     JOIN categories c ON i.category_id=c.id
     WHERE c.menu_id=?`,
    [menuId]
  );
  return rows;
};
