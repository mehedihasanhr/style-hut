"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserModel = _interopRequireDefault(require("../../models/UserModel"));
var _UserResponse = require("../../response/UserResponse");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class RegisterController {
  constructor() {
    _defineProperty(this, "register", async (req, res) => {
      const {
        name,
        email,
        password
      } = req.body;

      // * check if user provided current credentials
      // ! if not, return error
      if (!name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Please fill all fields'
        });
      }
      try {
        // * check if user exists
        const isExisted = await _UserModel.default.findOne({
          email
        }).exec();

        // ! if user is existed, return error
        if (isExisted) {
          return res.status(400).json({
            status: 'error',
            message: 'User already exists'
          });
        }

        // * create user
        const user = await _UserModel.default.create(_objectSpread({}, req.body));

        // * check if user is created
        // ! if not, return error

        if (!user) {
          return res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
          });
        }

        // * user response
        (0, _UserResponse.UserResponse)(req, res, {
          user,
          message: 'User created successfully'
        });

        // // * generate token
        // const tokenPayload = {
        //     id: user._id,
        //     email: user.email,
        //     role: user.role,
        //     name: user.name,
        // }

        // const accessToken = await tokenUtils.accessToken(tokenPayload);
        // const refreshToken = await tokenUtils.refreshToken(tokenPayload);

        // // * check if token is generated
        // // ! if not, return error
        // if(!accessToken || !refreshToken) {
        //     return res.status(500).json({
        //         status: 'error',
        //         message: 'Internal server error', 
        //     });
        // }

        // // * active session
        // req.session.user = {
        //     user: {
        //         data : tokenPayload,
        //         logs: {
        //             ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        //             agent: req.headers['user-agent'],
        //             loginAt: new Date(),
        //         }
        //     }
        // }

        // // * set token to cookie
        // res.cookie('_rt', refreshToken, {
        //     httpOnly: true,
        //     maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // * 7 days
        //     secure: config.env === 'production' ? true : false,
        //     sameSite: 'none'
        // });

        // // * return token

        // return res.status(200).json({
        //     status: 'success',
        //     message: 'User created successfully',
        //     data: {
        //         token: accessToken,
        //         user: {
        //             id: user._id,
        //             name: user.name,
        //             email: user.email,
        //             role: user.role,
        //         }
        //     }
        // });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
  }
}
var _default = new RegisterController();
exports.default = _default;