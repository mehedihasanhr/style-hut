"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _ProductModel = _interopRequireDefault(require("../models/ProductModel"));
var _FilterProductUtils = require("../utils/FilterProductUtils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ProductController {
  constructor() {
    // * post method to create a new product
    _defineProperty(this, "create", async (req, res) => {
      try {
        // * create new product
        let product = await _ProductModel.default.create(req.body);

        // * filter product data and remove __v field
        product = product.toObject();
        delete product.__v;
        delete product.createdAt;
        delete product.updatedAt;

        // * return product
        return res.status(201).json({
          status: 'success',
          message: 'Product created successfully'
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
    //* get method to get all products
    _defineProperty(this, "getAllProducts", async (req, res) => {
      const limit = parseInt(req.query.limit) || 2;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;
      const filter = (0, _FilterProductUtils.filterProductData)(req.query);
      try {
        // * get all products with pagination and sorting
        let products = await _ProductModel.default.find(filter).skip(skip).limit(limit);
        console.log(products);

        // * filter product data and remove __v field
        products = products.map(product => {
          product = product.toObject();
          delete product.__v;
          return product;
        });

        // * return products
        return res.status(200).json({
          status: 'success',
          message: 'Products fetched successfully',
          data: products
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
    //* get method to get a single product
    _defineProperty(this, "getSingleProduct", async (req, res) => {
      try {
        // * get product
        let product = await _ProductModel.default.findById(req.params.id).populate({
          path: 'reviews',
          populate: {
            path: 'user',
            select: 'name'
          },
          populate: {
            path: 'replies',
            select: 'user comment',
            populate: {
              path: 'user',
              select: 'name'
            }
          }
        }).exec();

        // * check if product exists
        if (!product) {
          return res.status(404).json({
            status: 'error',
            message: 'Product not found'
          });
        }

        // * filter product data and remove __v field
        product = product.toObject();
        delete product.__v;
        delete product.createdAt;
        delete product.updatedAt;

        // * return product
        return res.status(200).json({
          status: 'success',
          message: 'Product fetched successfully',
          data: product
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
    // * put method to update a product
    _defineProperty(this, "update", async (req, res) => {
      // * validate request body for required fields
      if (_lodash.default.isEmpty(req.body)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid request body'
        });
      }
      try {
        // * check if product exists
        const existedProduct = await _ProductModel.default.findById(req.params.id);
        if (!existedProduct) {
          return res.status(404).json({
            status: 'error',
            message: 'Product not found'
          });
        }

        // * update product
        let updatedProduct = await _ProductModel.default.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        });

        // * filter product data and remove some field
        updatedProduct = updatedProduct.toObject();
        delete updatedProduct.__v;
        delete updatedProduct.createdAt;
        delete updatedProduct.updatedAt;
        if (!updatedProduct) {
          return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          });
        }

        // * return product
        return res.status(200).json({
          status: 'success',
          message: 'Product updated successfully',
          data: updatedProduct
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
    // * delete method to delete a product
    _defineProperty(this, "delete", async (req, res) => {
      // * check if product exists
      const existedProduct = await _ProductModel.default.findById(req.params.id);
      if (!existedProduct) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found'
        });
      }
      try {
        // * delete product
        await _ProductModel.default.findByIdAndDelete(req.params.id);

        // * return product
        return res.status(200).json({
          status: 'success',
          message: 'Product deleted successfully'
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }
    });
  }
}
var _default = new ProductController();
exports.default = _default;