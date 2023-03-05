"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ProductsController = _interopRequireDefault(require("../controllers/ProductsController"));
var _ReviewsController = _interopRequireDefault(require("../controllers/ReviewsController"));
var _Authorize = require("../middleware/Authorize");
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

//* Get /products
router.get("/", _ProductsController.default.getAllProducts);
router.get("/:id", _ProductsController.default.getSingleProduct);
router.use(_Authorize.Authorize, _Authorize.isAdmin); // * authorize user
router.post("/", _middleware.valProductReqBody, _ProductsController.default.create); // * create a product
router.put("/:id", _ProductsController.default.update); // * update a product
router.patch("/:id", _ProductsController.default.update); // * update a product
router.delete("/:id", _ProductsController.default.delete); // * delete a product

// * review routes
router.post("/:id/reviews", _ReviewsController.default.createReview); // * create a review
router.put("/reviews/:reviewId", _ReviewsController.default.updateReview); // * update a review , # PUT
router.patch("/reviews/:reviewId", _ReviewsController.default.updateReview); // * update a review , # PATCH
router.delete("/reviews/:reviewId/delete", _ReviewsController.default.deleteReview); // ! delete a review
// * reply routes
router.post("/:reviewId/replies", _ReviewsController.default.createReply); // * create a reply
router.delete("/:reviewId/replies/:replyId/delete", _ReviewsController.default.deleteReply); // ! delete a reply
var _default = router;
exports.default = _default;