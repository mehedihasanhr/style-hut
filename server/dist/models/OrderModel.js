"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carts: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
  },
  address: {
    type: {
      country: {
        type: String,
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      street: {
        type: String,
        default: ''
      },
      house: {
        type: String,
        default: ''
      },
      apartment: {
        type: String,
        default: ''
      },
      zip: {
        type: String,
        default: ''
      },
      _id: false
    },
    default: {}
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  payment: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Payment',
    default: null
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  delivery: {
    type: {
      type: String,
      enum: ['delivery', 'pickup'],
      default: 'delivery'
    },
    date: {
      type: Date,
      default: Date.now
    },
    time: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    _id: false
  }
}, {
  timestamps: true
});
const Order = _mongoose.default.model("Order", orderSchema);
var _default = Order;
exports.default = _default;