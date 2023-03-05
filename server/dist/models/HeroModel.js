"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// hero slider schema
const heroSchema = new _mongoose.default.Schema({
  slider: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Photo'
  },
  active: {
    type: Boolean,
    default: true
  }
});
const HeroSlider = _mongoose.default.model('Hero', heroSchema);
var _default = HeroSlider;
exports.default = _default;