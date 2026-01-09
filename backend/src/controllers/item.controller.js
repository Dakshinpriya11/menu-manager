<<<<<<< HEAD
const service = require("../services/item.service");

exports.createItem = async (req, res) => {
  await service.createItem(req.body);
  res.json({ message: "Item created" });
};

exports.getItems = async (req, res) => {
  const items = await service.getItems(req.query.categoryId);
  res.json(items);
};

exports.updateItem = async (req, res) => {
  await service.updateItem(req.params.itemId, req.body);
  res.json({ message: "Item updated" });
};

exports.deleteItem = async (req, res) => {
  await service.deleteItem(req.params.itemId);
  res.json({ message: "Item deleted" });
};

exports.setItemPricing = async (req, res) => {
  await service.setItemPricing(req.params.itemId, req.body);
  res.json({ message: "Pricing set" });
};

exports.updateAvailability = async (req, res) => {
  await service.updateAvailability(req.params.itemId, req.body.available);
  res.json({ message: "Availability updated" });
};
=======
const service = require("../services/item.service");

exports.createItem = async (req, res) => {
  await service.createItem(req.body);
  res.json({ message: "Item created" });
};

exports.getItems = async (req, res) => {
  const items = await service.getItems(req.query.categoryId);
  res.json(items);
};

exports.updateItem = async (req, res) => {
  await service.updateItem(req.params.itemId, req.body);
  res.json({ message: "Item updated" });
};

exports.deleteItem = async (req, res) => {
  await service.deleteItem(req.params.itemId);
  res.json({ message: "Item deleted" });
};

exports.setItemPricing = async (req, res) => {
  await service.setItemPricing(req.params.itemId, req.body);
  res.json({ message: "Pricing set" });
};

exports.updateAvailability = async (req, res) => {
  await service.updateAvailability(req.params.itemId, req.body.available);
  res.json({ message: "Availability updated" });
};
>>>>>>> 62d7ef15f9eb5f723e21db59dca112ded226f0e0
