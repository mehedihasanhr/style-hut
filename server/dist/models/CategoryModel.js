"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const categorySchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  sub: {
    type: [String],
    required: true
  }
});
const Category = _mongoose.default.model('Category', categorySchema);
var _default = Category;
exports.default = _default;