"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../../config"));
var _UserModel = _interopRequireDefault(require("../../models/UserModel"));
var _UserResponse = require("../../response/UserResponse");
var _TokenUtils = _interopRequireDefault(require("../../utils/TokenUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class LoginController {
  constructor() {
    _defineProperty(this, "login", async (req, res) => {
      const {
        email,
        password
      } = req.body;
      try {
        // * check if user provided current credentials
        // ! if not, return error
        if (!email || !password) {
          return res.status(400).json('Please provide email and password');
        }

        // * check if user exists
        const existedUser = await _UserModel.default.findOne({
          email
        }).exec();

        // ! if user is not existed, return error
        if (!existedUser) {
          return res.status(400).json('Your credentials are not correct');
        }

        // * check if password is correct
        const isPasswordCorrect = await existedUser.validatePassword(password);

        // ! if password is not correct, return error
        if (!isPasswordCorrect) {
          return res.status(400).json('Your credentials are not correct');
        }

        // * user response
        (0, _UserResponse.UserResponse)(req, res, {
          user: existedUser,
          message: 'User logged in successfully'
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
      }
    });
  }
}
var _default = new LoginController();
exports.default = _default;