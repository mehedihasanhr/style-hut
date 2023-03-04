"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PhotoSchema = new _mongoose.default.Schema({
  originalname: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
const PhotoModel = _mongoose.default.model('Photo', PhotoSchema);
var _default = PhotoModel;
exports.default = _default;