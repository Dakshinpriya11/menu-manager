<<<<<<< HEAD
// backend/src/routes/menu.routes.js
const express = require("express");
const controller = require("../controllers/menu.controller.js");
const router = express.Router();

router.post("/", controller.createMenu);
router.get("/", controller.getMenus);
router.patch("/:menuId/status", controller.updateMenuStatus);
router.delete("/:menuId", controller.deleteMenu);

router.post("/:menuId/timing", controller.setMenuTiming);
router.get("/active", controller.getActiveMenu);
router.get("/:menuId", controller.getMenuByOrderType);
router.get("/:menuId/availability", controller.getMenuAvailability);

module.exports = router;
=======
const express = require("express");
const controller = require("../controllers/menu.controller.js");
const router = express.Router();

router.post("/", controller.createMenu);
router.get("/", controller.getMenus);
router.patch("/:menuId/status", controller.updateMenuStatus);
router.delete("/:menuId", controller.deleteMenu);

router.post("/:menuId/timing", controller.setMenuTiming);
router.get("/active", controller.getActiveMenu);
router.get("/:menuId", controller.getMenuByOrderType);
router.get("/:menuId/availability", controller.getMenuAvailability);

module.exports = router;
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
