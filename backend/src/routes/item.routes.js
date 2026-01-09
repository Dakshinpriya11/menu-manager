<<<<<<< HEAD
// backend/src/routes/item.routes.js
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
=======
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
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
