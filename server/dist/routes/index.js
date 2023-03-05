"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _authRoutes = _interopRequireDefault(require("./authRoutes"));
var _productsRoutes = _interopRequireDefault(require("./productsRoutes"));
var _cartsRoutes = _interopRequireDefault(require("./cartsRoutes"));
var _ordersRoutes = _interopRequireDefault(require("./ordersRoutes"));
var _uploadsRoutes = _interopRequireDefault(require("./uploadsRoutes"));
var _categoriesRoutes = _interopRequireDefault(require("./categoriesRoutes"));
var _heroSliderRoutes = _interopRequireDefault(require("./heroSliderRoutes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

// * all routes here...
router.use('/auth', _authRoutes.default);
router.use('/products', _productsRoutes.default);
router.use('/carts', _cartsRoutes.default);
router.use('/orders', _ordersRoutes.default);
router.use('/uploads', _uploadsRoutes.default);
router.use('/categories', _categoriesRoutes.default);
router.use('/hero-slider', _heroSliderRoutes.default);
var _default = router;
exports.default = _default;