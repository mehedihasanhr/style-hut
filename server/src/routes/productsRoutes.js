import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import ReviewsController from "../controllers/ReviewsController";
import {Authorize, isAdmin} from "../middleware/Authorize";
import { valProductReqBody } from "../middleware";

const router = Router();

//* Get /products
router.get("/", ProductsController.getAllProducts);
router.get("/:id", ProductsController.getSingleProduct);

router.use(Authorize, isAdmin); // * authorize user
router.post("/",valProductReqBody, ProductsController.create); // * create a product
router.put("/:id", ProductsController.update); // * update a product
router.patch("/:id", ProductsController.update); // * update a product
router.delete("/:id", ProductsController.delete); // * delete a product

// * review routes
router.post("/:id/reviews", ReviewsController.createReview); // * create a review
router.put("/reviews/:reviewId", ReviewsController.updateReview); // * update a review , # PUT
router.patch("/reviews/:reviewId", ReviewsController.updateReview); // * update a review , # PATCH
router.delete("/reviews/:reviewId/delete", ReviewsController.deleteReview); // ! delete a review
// * reply routes
router.post("/:reviewId/replies", ReviewsController.createReply); // * create a reply
router.delete("/:reviewId/replies/:replyId/delete", ReviewsController.deleteReply); // ! delete a reply

export default router;