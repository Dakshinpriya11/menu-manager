<<<<<<< HEAD
// backend/src/routes/category.routes.js
const express = require("express");
const controller = require("../controllers/category.controller.js"); 
const router = express.Router();

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.put("/:categoryId", controller.updateCategory);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;
=======
const express = require("express");
const controller = require("../controllers/category.controller.js");
const router = express.Router();

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.put("/:categoryId", controller.updateCategory);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
