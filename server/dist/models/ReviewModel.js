"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * Reply Schema
const replySchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reply: {
    type: String,
    required: true
  }
});

// * Review Schema
const reviewSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.Schema.Types.ObjectId
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["review", "reply"],
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    max: 5,
    min: 0
  },
  comment: {
    type: String,
    default: ""
  },
  images: {
    type: [String],
    default: []
  },
  replies: {
    type: [replySchema],
    default: []
  }
});
const ReviewModel = _mongoose.default.model("Review", reviewSchema);
var _default = ReviewModel;
exports.default = _default;