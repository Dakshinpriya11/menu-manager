<<<<<<< HEAD
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "menu_user",
  password: "menu123",
  database: "menu_manager"
});

module.exports = db;
=======
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "menu_user",
  password: "menu123",
  database: "menu_manager"
});

module.exports = db;
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
