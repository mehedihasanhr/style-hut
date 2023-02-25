import OrdersController from "../controllers/OrdersController";
import { Router } from "express";
const router = Router();

// * all orders routes
router.post("/", OrdersController.createOrder);
router.get("/", OrdersController.getOrders);
router.get("/:orderId", OrdersController.getOrder);
router.get("/user", OrdersController.getOrdersByUser);
router.delete("/:orderId", OrdersController.deleteOrder);


export default router;