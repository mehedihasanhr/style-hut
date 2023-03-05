"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const notificationSchema = new _mongoose.default.Schema({
  id: {
    type: _mongoose.default.Schema.Types.ObjectId
  },
  type: {
    type: String,
    enum: ["like", "comment", "reply", "follow", "mention", "message", "out_of_stock", "new_product", "new_user", "new_order", "sold"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  notification: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});
const Notification = _mongoose.default.model("Notification", notificationSchema);
var _default = Notification;
exports.default = _default;