
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

