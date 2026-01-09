const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "menu_user",
  password: "menu123",
  database: "menu_manager"
});

module.exports = db;
