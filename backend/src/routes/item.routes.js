const express = require("express");
const controller = require("../controllers/item.controller.js");
const router = express.Router();

router.post("/", controller.createItem);
router.get("/", controller.getItems);
router.put("/:itemId", controller.updateItem);
router.delete("/:itemId", controller.deleteItem);

router.post("/:itemId/order-types", controller.setItemPricing);
router.patch("/:itemId/availability", controller.updateAvailability);

module.exports = router;
