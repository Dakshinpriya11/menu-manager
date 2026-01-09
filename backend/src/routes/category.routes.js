const express = require("express");
const controller = require("../controllers/category.controller.js");
const router = express.Router();

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.put("/:categoryId", controller.updateCategory);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;
