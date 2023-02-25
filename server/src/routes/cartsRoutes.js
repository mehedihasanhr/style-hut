import { Router } from "express";
import cartsController from "../controllers/CartsController";
import {Authorize} from "../middleware/Authorize";


const router = Router();

// * all routes here...
router.use(Authorize);
router.post("/", cartsController.createCart);
router.get("/:cartId", cartsController.getCart);
router.put("/:cartId", cartsController.updateCart);
router.patch("/:cartId", cartsController.updateCart);
router.delete("/:cartId", cartsController.deleteCart);


export default router;
