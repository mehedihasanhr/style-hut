"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _NotificationModel = _interopRequireDefault(require("../models/NotificationModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class NotificationController {
  constructor() {
    this.res = null;
    this.message = this.message.bind(this);
    this.createNotification = this.createNotification.bind(this);
  }

  // * message
  async message(code, status, message) {
    return this.res.status(code).json({
      status,
      message
    });
  }

  //* create a new notification
  async createNotification(req, res) {
    this.res = res;
  }
}
var _default = new NotificationController();
exports.default = _default;