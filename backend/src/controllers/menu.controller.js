const service = require("../services/menu.service");

exports.createMenu = async (req, res) => {
  const result = await service.createMenu(req.body);
  res.json(result);
};

exports.getMenus = async (req, res) => {
  const menus = await service.getMenus(req.query.outletId);
  res.json(menus);
};

exports.updateMenuStatus = async (req, res) => {
  await service.updateMenuStatus(req.params.menuId, req.body.active);
  res.json({ message: "Status updated" });
};

exports.deleteMenu = async (req, res) => {
  await service.deleteMenu(req.params.menuId);
  res.json({ message: "Menu deleted" });
};

exports.setMenuTiming = async (req, res) => {
  await service.setMenuTiming(req.params.menuId, req.body);
  res.json({ message: "Timing set" });
};

exports.getActiveMenu = async (req, res) => {
  const menu = await service.getActiveMenu(req.query);
  res.json(menu);
};

exports.getMenuByOrderType = async (req, res) => {
  const menu = await service.getMenuByOrderType(
    req.params.menuId,
    req.query.orderType
  );
  res.json(menu);
};

exports.getMenuAvailability = async (req, res) => {
  const data = await service.getMenuAvailability(req.params.menuId);
  res.json(data);
};
