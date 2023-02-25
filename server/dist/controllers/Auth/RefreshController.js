"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserModel = _interopRequireDefault(require("../../models/UserModel"));
var _UserResponse = require("../../response/UserResponse");
var _TokenUtils = _interopRequireDefault(require("../../utils/TokenUtils"));
var _config = _interopRequireDefault(require("../../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class RefreshController {
  constructor() {
    _defineProperty(this, "refresh", async (req, res) => {
      const uid = req.session.user.data.id;
      if (!uid) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
      }
      try {
        const user = await _UserModel.default.findById(uid).select('-password').exec();

        // ! if user is not existed, return error
        if (!user) {
          return res.status(400).json({
            status: 'error',
            message: 'User not found'
          });
        }

        // * user response
        (0, _UserResponse.UserResponse)(req, res, {
          user,
          message: 'User refreshed successfully'
        });
      } catch (err) {
        console.log('error');
        return res.status(500).json({
          status: 'error',
          message: err?.message || 'Internal server error'
        });
      }
    });
  }
}
var _default = new RefreshController();
exports.default = _default;