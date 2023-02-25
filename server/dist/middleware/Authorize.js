"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.Authorize = void 0;
var _TokenUtils = _interopRequireDefault(require("../utils/TokenUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Authorize = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  const decodedToken = await _TokenUtils.default.verifyAccessToken(token);
  if (!decodedToken) {
    return res.status(403).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  req.user = decodedToken;
  return next();
};

// is admin middleware
exports.Authorize = Authorize;
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  return next();
};
exports.isAdmin = isAdmin;