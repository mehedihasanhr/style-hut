"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ReviewModel = _interopRequireDefault(require("../models/ReviewModel"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _ProductModel = _interopRequireDefault(require("../models/ProductModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ReviewsController {
  // * user error messages

  // * product error messages

  // * Create a review
  async createReview(req, res) {
    try {
      //* get user id
      const userId = req.session.user.data.id;

      // ! if user is not logged in, return error
      if (!userId) {
        return res.status(400).json({
          status: 'error',
          message: 'You must be logged in to create a review'
        });
      }

      //* get product id 
      const productId = req.params.id;
      if (!productId) {
        return res.status(400).json({
          status: 'error',
          message: 'Product id is required'
        });
      }

      //* save review to database 
      const review = await _ReviewModel.default.create(_objectSpread({
        product: productId,
        user: userId,
        type: "review"
      }, req.body));

      //* update product reviews array
      await _ProductModel.default.findByIdAndUpdate(productId, {
        $push: {
          reviews: review._id
        }
      });

      //* update user reviews array
      await _UserModel.default.findByIdAndUpdate(userId, {
        $push: {
          reviews: review._id
        }
      });

      //* return review
      return res.status(201).json({
        status: 'success',
        message: 'Review created successfully',
        data: review
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }

  /* 
      * edit a review
      * @params: reviewId
  */

  async updateReview(req, res) {
    const {
      reviewId
    } = req.params;

    // ! if review id is not provided, return error
    if (!reviewId) return res.status(400).json({
      status: 'error',
      message: 'Review id is required'
    });
    try {
      // * find review and update
      await _ReviewModel.default.findByIdAndUpdate(reviewId, req.body).then(review => {
        // * return updated review
        return res.status(200).json({
          status: 'success',
          message: 'Review updated successfully',
          data: review
        });
      }).catch(err => {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }

  /*
      * delete a review 
      * @params: reviewId
      * @return: deleted review
  */
  async deleteReview(req, res) {
    const {
      reviewId
    } = req.params;
    if (!reviewId) return res.status(400).json({
      status: 'error',
      message: 'Review id is required'
    });
    try {
      // * find and delete review
      await _ReviewModel.default.findByIdAndDelete(reviewId).then(review => {
        // * delete review from product reviews array
        _ProductModel.default.findByIdAndUpdate(review.product, {
          $pull: {
            reviews: review._id
          }
        });

        // * delete review from user reviews array
        _UserModel.default.findByIdAndUpdate(review.user, {
          $pull: {
            reviews: review._id
          }
        });

        // * return deleted review
        return res.status(200).json({
          status: 'success',
          message: 'Review deleted successfully',
          data: review
        });
      }).catch(err => {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /* Reply control */
  // * create a reply to a review 
  async createReply(req, res) {
    try {
      // * get user
      const userId = req.session.user.data.id;

      // ! if user is not logged in, return error
      if (!userId) return res.status(400).json(this.userErrorMessages);

      // * get product id
      const reviewId = req.params.reviewId;

      // ! if product id is not provided, return error
      if (!reviewId) return res.status(400).json(this.productErrorMessages);

      // * also check if review exists
      let review = await _ReviewModel.default.findById(reviewId);

      // ! if review does not exist, return error
      if (!review) return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });

      // push reply to review

      review.replies.push({
        user: userId,
        reply: req.body.reply
      });
      await review.save().then(review => {
        return res.status(201).json({
          status: 'success',
          message: 'Reply created successfully',
          data: review
        });
      }).catch(err => {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  // * delete a reply 
  async deleteReply(req, res) {
    /*
    * * @params: reviewId, replyId
    */

    const {
      reviewId,
      replyId
    } = req.params;
    if (!reviewId || !replyId) return res.status(400).json({
      status: 'error',
      message: 'Review id and reply id are required'
    });
    try {
      // * get review from database 
      let review = await _ReviewModel.default.findById(reviewId);

      // * check if review exists
      // ! if review does not exist, return error
      if (!review) return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });

      // * filter out reply to be deleted
      review.replies = review.replies.filter(reply => reply._id != replyId);

      // * save review
      await review.save().then(review => {
        return res.status(200).json({
          status: 'success',
          message: 'Reply deleted successfully',
          data: review
        });
      }).catch(err => {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}
_defineProperty(ReviewsController, "userErrorMessages", {
  status: 'error',
  message: 'You must be logged in to create a review'
});
_defineProperty(ReviewsController, "productErrorMessages", {
  status: 'error',
  message: 'Product id is required'
});
var _default = new ReviewsController();
exports.default = _default;