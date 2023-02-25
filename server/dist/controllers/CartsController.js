"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CartModel = _interopRequireDefault(require("../models/CartModel"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class CartsController {
  constructor() {
    this.res = null;
    this.createCart = this.createCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
  }

  // * params error handler
  errorMessage(status, message) {
    return this.res.status(status).json({
      status: "error",
      message
    });
  }

  // * get cart 
  async getCart(req, res) {
    this.res = res;
    const {
      cartId
    } = req.params;
    if (!cartId) {
      return this.errorMessage(400, "Invalid request body");
    }
    try {
      await _CartModel.default.findById(cartId).exec().then(cart => {
        if (!cart) {
          return this.errorMessage(404, "Cart not found");
        }
        return res.status(200).json({
          status: "success",
          message: "Cart fetched successfully",
          data: cart
        });
      }).catch(err => {
        console.log(err);
        return this.errorMessage(500, err.message);
      });
    } catch (error) {
      console.log(error);
      return this.errorMessage(500, error.message);
    }
  }

  // * create new cart 
  async createCart(req, res) {
    this.res = res;
    const userId = req.session.user.data.id;
    if (!userId) {
      return this.errorMessage(400, "Invalid request body");
    }
    let user = await _UserModel.default.findById(userId).select('carts').exec();

    // ! if user is not found
    if (!user) {
      return this.errorMessage(404, "User not found");
    }

    // * check if user has a cart
    try {
      const cart = await _CartModel.default.create(_objectSpread({
        user: userId
      }, req.body));
      if (!cart) {
        return this.errorMessage(500, "Cart not created");
      }
      ;
      // * add cart to user
      user.carts.push(cart._id);

      // * save user
      await user.save().catch(err => {
        console.log(err);
      });
      return res.status(201).json({
        status: "success",
        message: "Cart created successfully",
        data: cart
      });
    } catch (error) {
      console.log(error);
      return this.errorMessage(500, error.message);
    }
  }

  // * edit cart 

  async updateCart(req, res) {
    this.res = res;
    //* get cart id from params
    const {
      cartId
    } = req.params;

    // ! if cart id is not provided
    if (!cartId) {
      return this.errorMessage(400, "Invalid request body");
    }
    try {
      // * find cart by id
      let cart = await _CartModel.default.findById(cartId).exec();

      // ! if cart is not found
      if (!cart) {
        return this.errorMessage(404, "Cart not found");
      }

      // * update cart
      cart.carts = req.body.carts;

      // * save cart
      await cart.save().then(c => {
        return res.status(200).json({
          status: "success",
          message: "Cart updated successfully",
          data: c
        });
      }).catch(err => {
        console.log(err);
        return this.errorMessage(500, err.message);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }

  // * delete cart
  async deleteCart(req, res) {
    this.res = res;
    //* get cart id from params
    const {
      cartId
    } = req.params;
    const userId = req.session.user.data.id;

    // ! if cart id is not provided
    if (!cartId) {
      return this.errorMessage(400, "Invalid request");
    }

    // ! if user id is not provided
    if (!userId) {
      return this.errorMessage(400, "Session expired! please login again");
    }
    try {
      let user = await _UserModel.default.findById(userId).select('carts').exec();

      // ! if user is not found
      if (!user) {
        return this.errorMessage(404, "User not found");
      }

      // * delete cart
      await _CartModel.default.findByIdAndDelete(cartId).exec().then(async cart => {
        // * remove cart from user
        user.carts.pull(cart._id);

        // * save user
        await user.save().catch(err => {
          console.log(err);
        });
        return res.status(200).json({
          status: "success",
          message: "Cart deleted successfully"
        });
      }).catch(err => {
        return this.errorMessage(500, err.message);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }
}
var _default = new CartsController();
exports.default = _default;