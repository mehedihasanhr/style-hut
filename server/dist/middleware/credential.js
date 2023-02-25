"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentials = void 0;
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const credentials = (req, res, next) => {
  const listedOrigins = _config.default.origin.split(',');
  const origin = req.headers.origin;
  if (listedOrigins.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  next();
};
exports.credentials = credentials;