"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _CartsController = _interopRequireDefault(require("../controllers/CartsController"));
var _Authorize = require("../middleware/Authorize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

// * all routes here...
router.use(_Authorize.Authorize);
router.post("/", _CartsController.default.createCart);
router.get("/:cartId", _CartsController.default.getCart);
router.put("/:cartId", _CartsController.default.updateCart);
router.patch("/:cartId", _CartsController.default.updateCart);
router.delete("/:cartId", _CartsController.default.deleteCart);
var _default = router;
exports.default = _default;