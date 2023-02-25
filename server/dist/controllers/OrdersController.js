"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CartModel = _interopRequireDefault(require("../models/CartModel"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class OrdersController {
  constructor() {
    this.res = null;
    this.errorMessage = this.errorMessage.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getOrdersByUser = this.getOrdersByUser.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  // * params error handler
  errorMessage(status, message) {
    return this.res.status(status).json({
      status: "error",
      message
    });
  }

  // * get all orders
  async getOrders(req, res) {
    this.res = res;
    try {
      await _OrderModel.default.find().exec().then(orders => {
        if (!orders) return this.errorMessage(404, "No orders found");
        return res.status(200).json({
          status: "success",
          message: "Orders fetched successfully",
          data: orders
        });
      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }

  // * get single order
  async getOrder(req, res) {
    this.res = res;
    // * get order id from params
    const {
      orderId
    } = req.params;
    try {
      await _OrderModel.default.findById(orderId).exec().then(order => {
        if (!order) return this.errorMessage(404, "Order not found");
        return res.status(200).json({
          status: "success",
          message: "Order fetched successfully",
          data: order
        });
      }).catch(err => {
        return this.errorMessage(500, err.message);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }

  // * get orders by user
  async getOrdersByUser(req, res) {
    this.res = res;
    const userId = req.session.user.data.id;
    if (!userId) {
      return this.errorMessage(400, "Please login to continue");
    }
    try {
      await _OrderModel.default.find({
        user: userId
      }).exec().then(orders => {
        if (!orders) return this.errorMessage(404, "No orders found");
        return res.status(200).json({
          status: "success",
          message: "Orders fetched successfully",
          data: orders
        });
      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }

  // * create new Order 
  async createOrder(req, res) {
    this.res = res;
    const userId = req.session.user.data.id;
    if (!userId) {
      return this.errorMessage(400, "Please login to continue");
    }
    try {
      //* user data
      let user = await _UserModel.default.findById(userId).select('orders carts').exec();
      const carts = await _CartModel.default.findOne({
        user: userId
      }).exec();
      if (!carts) {
        return this.errorMessage(404, "Cart not found");
      }
      await _OrderModel.default.create(_objectSpread({
        user: userId,
        carts
      }, req.body)).then(async order => {
        if (!order) {
          return this.errorMessage(500, "Order not created");
        }

        // * add order to user
        user.orders.push(order._id);
        // * remove cart
        user.carts.pull(carts._id);

        // ! remove cart from db
        await carts.remove().catch(err => console.log(err));

        // * save user
        await user.save();
        return res.status(201).json({
          status: "success",
          message: "Order created successfully",
          data: order
        });
      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }

  // * delete order
  async deleteOrder(req, res) {
    this.res = res;
    const userId = req.session.user.data.id;
    const {
      orderId
    } = req.params;

    // * check if user is logged in
    if (!userId) {
      return this.errorMessage(400, "Please login to continue");
    }

    // * check if order id is provided
    if (!orderId) {
      return this.errorMessage(400, "Please provide order id");
    }

    // * check if order exists
    try {
      await _OrderModel.default.findById(orderId).exec().then(async order => {
        if (!order) return this.errorMessage(404, "Order not found");

        // * check if order belongs to user
        if (order.user.toString() !== userId.toString()) {
          return this.errorMessage(403, "You are not authorized to delete this order");
        }

        // * check if order already shipped
        if (order.status === "shipped") {
          return this.errorMessage(403, "Your order has already been shipped");
        }

        // * delete order
        await order.remove().then(async () => {
          // * remove order from user
          await _UserModel.default.findById(userId).then(async user => {
            if (!user) return this.errorMessage(404, "User not found");
            user.orders.pull(order._id);
            await user.save();
          }).catch(err => {
            console.log(err);
          });
          return res.status(200).json({
            status: "success",
            message: "Order deleted successfully"
          });
        }).catch(err => {
          console.log(err);
          return this.errorMessage(500, "Order not deleted");
        });
      }).catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
      return this.errorMessage(500, err.message);
    }
  }
}
var _default = new OrdersController();
exports.default = _default;