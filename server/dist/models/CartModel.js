"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//* Cart Schema
const cartSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carts: [{
    product: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    extras: {
      type: [Map],
      default: []
    }
  }]
}, {
  timestamps: true
});
const Cart = _mongoose.default.model("Cart", cartSchema);
var _default = Cart;
exports.default = _default;