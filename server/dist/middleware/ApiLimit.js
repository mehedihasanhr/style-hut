"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiLimit = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * 100 requests per 15 minutes
const apiLimit = (0, _expressRateLimit.default)({
  windowMs: 15 * 60 * 1000,
  // * 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again in 15 minutes'
});
exports.apiLimit = apiLimit;