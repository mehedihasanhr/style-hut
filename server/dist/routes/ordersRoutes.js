"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));
var _express = require("express");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

// * all orders routes
router.post("/", _OrdersController.default.createOrder);
router.get("/", _OrdersController.default.getOrders);
router.get("/:orderId", _OrdersController.default.getOrder);
router.get("/user", _OrdersController.default.getOrdersByUser);
router.delete("/:orderId", _OrdersController.default.deleteOrder);
var _default = router;
exports.default = _default;