"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valProductReqBody = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const valProductReqBody = (req, res, next) => {
  const data = req.body;
  const {
    title,
    price,
    stock,
    categories,
    images,
    tags
  } = data;
  if (!title || !price || !stock || _lodash.default.isEmpty(categories) || images.length === 0 || tags.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request body'
    });
  }
  next();
};
exports.valProductReqBody = valProductReqBody;