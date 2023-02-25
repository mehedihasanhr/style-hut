"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * Product Schema
const productSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  categories: {
    type: {
      main: {
        type: String,
        required: true
      },
      sub: {
        type: [String],
        default: []
      },
      _id: false
    }
  },
  short_desc: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    default: ""
  },
  images: {
    type: [String],
    required: true,
    default: []
  },
  reviews: {
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: "Review",
    default: []
  },
  rating: {
    type: Number,
    max: 5,
    min: 0,
    default: 0
  },
  gender: {
    type: String,
    default: ""
  },
  brand: {
    type: String,
    default: "No Brand"
  },
  specifications: {
    type: [{
      key: {
        type: String,
        required: true
      },
      val: {
        type: String,
        required: true
      }
    }],
    default: {}
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  warranty: {
    type: String,
    default: "No Warranty"
  },
  return_policy: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});
const ProductModel = _mongoose.default.model("Product", productSchema);
var _default = ProductModel;
exports.default = _default;