"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const TokenUtils = Object.create({
  // * Access token
  accessToken: async payload => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.sign(_objectSpread({}, payload), _config.default.secrets.jwt, {
        expiresIn: _config.default.accessTokenSecret.jwtExp
      }, (error, token) => {
        if (error) return resolve(false);
        resolve(token);
      });
    });
  },
  // * Verify Access token
  verifyAccessToken: async token => {
    return new Promise(resolve => {
      _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (error, decoded) => {
        if (error) return resolve(false);
        resolve(decoded);
      });
    });
  },
  // * Refresh token
  refreshToken: async payload => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.sign(_objectSpread({}, payload), _config.default.secrets.jwt, {
        expiresIn: _config.default.refreshTokenSecret.jwtExp
      }, (error, token) => {
        if (error) return resolve(false);
        resolve(token);
      });
    });
  },
  // * Verify Refresh token
  verifyRefreshToken: async token => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (error, decoded) => {
        if (error) return resolve(false);
        resolve(decoded);
      });
    });
  }
});
var _default = TokenUtils;
exports.default = _default;