const express = require("express");

const menuRoutes = require("./routes/menu.routes");
const categoryRoutes = require("./routes/category.routes");
const itemRoutes = require("./routes/item.routes");

const app = express();

app.use(express.json());

// health check (important for testing)
app.get("/health", (req, res) => {
  res.send("Backend running");
});

console.log('menuRoutes import:', typeof menuRoutes);
console.log('categoryRoutes import:', typeof categoryRoutes);
console.log('itemRoutes import:', typeof itemRoutes);
console.log('menuRoutes keys:', Object.keys(menuRoutes));
console.log('categoryRoutes keys:', Object.keys(categoryRoutes));
console.log('itemRoutes keys:', Object.keys(itemRoutes));
console.log('menuRoutes constructor:', menuRoutes && menuRoutes.constructor && menuRoutes.constructor.name);
console.log('categoryRoutes constructor:', categoryRoutes && categoryRoutes.constructor && categoryRoutes.constructor.name);
console.log('itemRoutes constructor:', itemRoutes && itemRoutes.constructor && itemRoutes.constructor.name);
console.log('menuRoutes resolved path:', require.resolve('./routes/menu.routes'));
console.log('categoryRoutes resolved path:', require.resolve('./routes/category.routes'));
console.log('itemRoutes resolved path:', require.resolve('./routes/item.routes'));
console.log('menuRoutes.stack:', menuRoutes && menuRoutes.stack);
console.log('categoryRoutes.stack:', categoryRoutes && categoryRoutes.stack);
console.log('itemRoutes.stack:', itemRoutes && itemRoutes.stack);

app.use("/api/menus", menuRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

module.exports = app;
