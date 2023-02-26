"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//* load env variables
_dotenv.default.config();
const env = process.env.NODE_ENV || 'development';
const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 5000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '7d'
  },
  accessTokenSecret: {
    jwt: process.env.ACCESS_TOKEN_SECRET,
    jwtExp: '15m'
  },
  refreshTokenSecret: {
    jwt: process.env.REFRESH_TOKEN_SECRET,
    jwtExp: '7d'
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/style-hut-db'
  },
  origin: process.env.ORIGIN || 'http://localhost:3000,http://localhost:5000,http://localhost:3001'
};

// const envConfig = require(`./${env}`).default;

// export default _.merge(baseConfig, envConfig);
var _default = _objectSpread({}, baseConfig);
exports.default = _default;