"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserModel = _interopRequireDefault(require("../../models/UserModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AuthController {
  async me(req, res) {
    const user = await _UserModel.default.findById(req.user.id).select('-password -__v');
    if (!user) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json({
      success: true,
      data: user
    });
  }
}
var _default = new AuthController();
exports.default = _default;