"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _LoginController = _interopRequireDefault(require("../controllers/Auth/LoginController"));
var _RefreshController = _interopRequireDefault(require("../controllers/Auth/RefreshController"));
var _RegisterController = _interopRequireDefault(require("../controllers/Auth/RegisterController"));
var _middleware = require("../middleware");
var _LoginAttemptsLimiter = require("../middleware/LoginAttemptsLimiter");
var _AuthController = _interopRequireDefault(require("../controllers/Auth/AuthController"));
var _LogoutController = _interopRequireDefault(require("../controllers/Auth/LogoutController"));
var _Authorize = require("../middleware/Authorize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.post("/login", _LoginAttemptsLimiter.loginAttemptsLimiter, _LoginController.default.login);
router.post("/register", _RegisterController.default.register);

// * protected routes
router.use(_middleware.sessionValidation);
router.get("/refresh", _RefreshController.default.refresh);
router.get("/me", _Authorize.Authorize, _AuthController.default.me);
router.get("/logout", _LogoutController.default.logout);
var _default = router;
exports.default = _default;