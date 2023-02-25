"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginAttemptsLimiter = void 0;
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _rateLimitMongo = _interopRequireDefault(require("rate-limit-mongo"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// * 7 login attempts per 15 minutes from same email address locked for 1 hour

const loginAttemptsLimiter = (0, _expressRateLimit.default)({
  windowMs: 1000 * 60 * 60,
  // * 1 hour
  max: 10,
  store: new _rateLimitMongo.default({
    uri: _config.default.db.uri,
    collectionName: 'loginAttempts',
    expireTimeMs: 1000 * 60 * 60,
    // * 1 hour
    errorHandler: err => {
      console.log(err);
    }
  }),
  message: 'Your account is locked for 1 hour due to too many login attempts',
  keyGenerator: req => {
    return req.body.email;
  }
});
exports.loginAttemptsLimiter = loginAttemptsLimiter;