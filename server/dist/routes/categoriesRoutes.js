"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _CategoriesController = _interopRequireDefault(require("../controllers/CategoriesController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.get('/', _CategoriesController.default.index);
router.post('/', _CategoriesController.default.store);
var _default = router;
exports.default = _default;