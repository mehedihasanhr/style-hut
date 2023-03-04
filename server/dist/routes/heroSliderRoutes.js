"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _HeroSliderController = _interopRequireDefault(require("../controllers/HeroSliderController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.get('/', _HeroSliderController.default.index);
router.post('/', _HeroSliderController.default.store);
router.delete('/:id', _HeroSliderController.default.delete);
var _default = router;
exports.default = _default;