"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const paymentSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'canceled', 'failed'],
    default: 'pending'
  },
  payment: {
    type: Map,
    default: {}
  }
}, {
  timestamps: true
});
const Payment = _mongoose.default.model("Payment", paymentSchema);
var _default = Payment;
exports.default = _default;