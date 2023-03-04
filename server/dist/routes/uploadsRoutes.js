"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _UploadController = _interopRequireDefault(require("../controllers/UploadController"));
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

// * all routes here...
router.post('/', _middleware.upload.single('image'), _UploadController.default.upload);
var _default = router;
exports.default = _default;