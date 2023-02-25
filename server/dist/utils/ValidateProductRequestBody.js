"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateProductRequestBody = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateProductRequestBody = data => {
  const {
    title,
    price,
    stock,
    categories,
    images,
    tags
  } = data;
  if (!title || !price || !stock || _lodash.default.isEmpty(categories) || images.length === 0 || tags.length === 0) return false;
  return true;
};
exports.validateProductRequestBody = validateProductRequestBody;