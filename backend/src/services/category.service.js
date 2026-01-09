const db = require("../config/db");

exports.createCategory = async ({ menuId, name }) => {
  await db.query(
    "INSERT INTO categories (menu_id, name) VALUES (?, ?)",
    [menuId, name]
  );
};

exports.getCategories = async (menuId) => {
  const [rows] = await db.query(
    "SELECT * FROM categories WHERE menu_id=?",
    [menuId]
  );
  return rows;
};

exports.updateCategory = async (id, name) => {
  await db.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
};

exports.deleteCategory = async (id) => {
  await db.query("DELETE FROM categories WHERE id=?", [id]);
};
