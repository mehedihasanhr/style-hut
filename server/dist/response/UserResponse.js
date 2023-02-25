"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserResponse = void 0;
var _config = _interopRequireDefault(require("../config"));
var _TokenUtils = _interopRequireDefault(require("../utils/TokenUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserResponse = async (req, res, {
  user,
  message
}) => {
  // * generate token
  const tokenPayload = {
    id: user._id,
    role: user.role,
    name: user.name
  };
  const accessToken = await _TokenUtils.default.accessToken(tokenPayload);
  const refreshToken = await _TokenUtils.default.refreshToken(tokenPayload);

  // * check if token is generated
  // ! if not, return error
  if (!accessToken || !refreshToken) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }

  // * active session
  req.session.user = {
    data: tokenPayload,
    logs: {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      agent: req.headers['user-agent'],
      loginAt: new Date()
    }
  };

  // * set token to cookie
  res.cookie('rt', refreshToken, {
    httpOnly: true,
    maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // * 7 days
    secure: _config.default.env === 'production' ? true : false,
    sameSite: 'none'
  });

  // * return token

  // * filter user data and remove password field
  user = user.toObject();
  delete user.password;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;
  return res.status(200).json({
    status: 'success',
    message,
    data: {
      token: accessToken,
      user
    }
  });
};
exports.UserResponse = UserResponse;