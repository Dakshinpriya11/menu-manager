<<<<<<< HEAD
const service = require("../services/category.service");

exports.createCategory = async (req, res) => {
  await service.createCategory(req.body);
  res.json({ message: "Category created" });
};

exports.getCategories = async (req, res) => {
  const categories = await service.getCategories(req.query.menuId);
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  await service.updateCategory(req.params.categoryId, req.body.name);
  res.json({ message: "Category updated" });
};

exports.deleteCategory = async (req, res) => {
  await service.deleteCategory(req.params.categoryId);
  res.json({ message: "Category deleted" });
};
=======
const service = require("../services/category.service");

exports.createCategory = async (req, res) => {
  await service.createCategory(req.body);
  res.json({ message: "Category created" });
};

exports.getCategories = async (req, res) => {
  const categories = await service.getCategories(req.query.menuId);
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  await service.updateCategory(req.params.categoryId, req.body.name);
  res.json({ message: "Category updated" });
};

exports.deleteCategory = async (req, res) => {
  await service.deleteCategory(req.params.categoryId);
  res.json({ message: "Category deleted" });
};
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
