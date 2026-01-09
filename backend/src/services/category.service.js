<<<<<<< HEAD
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
=======
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
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
