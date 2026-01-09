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

app.use("/api/menus", menuRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

module.exports = app;
